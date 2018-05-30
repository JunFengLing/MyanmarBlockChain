var CryptoJS = require("crypto-js");
var WebSocket = require("ws");
var ArrayDiffer = require('array-differ');
var Account = require("../models/account");
var LogType = require("../models/log");
var MessageType = require("../models/message");
var { genesisBlock, p2p_port, log_ws_url } = require("../config");

var localname = "Genesis";
var initialed = false;

var calculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
};
var calculateHashForBlock = (block) => {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data);
};
var isValidNewBlock = (newBlock, previousBlock) => {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index');
        return false;
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previoushash');
        return false;
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash);
        return false;
    }
    return true;
};

var getLatestBlock = (blockchain) => blockchain[blockchain.length - 1];

var messageFactory =  {
    queryChainLengthMsg: ()=> ({'type': MessageType.QUERY_LATEST}),
    queryAllMsg: () => ({'type': MessageType.QUERY_ALL}),
    queryChainMsg: (blockchain) =>({
        'type': MessageType.RESPONSE_BLOCKCHAIN, 'data': JSON.stringify(blockchain)
    }),
    queryLatestBlockMsg:(blockchain) => ({
        'type': MessageType.RESPONSE_BLOCKCHAIN,
        'data': JSON.stringify([getLatestBlock(blockchain)])
    }),
    registerName: (name, connectport) => ({
        'type': MessageType.REGISTER_NAME,
        'name': name,
        "connectport" : connectport
    }),
    triggerSyncPeers:() => ({
        'type': MessageType.TRIGGER_SYNC_PEERS
     }),
    syncPeers:(accounts) => ({
        'type': MessageType.SYNC_PEERS,
        'data': JSON.stringify({selfname: localname, peers: accounts})
    })
};

var replaceChain = (newBlocks, app) => {
    if (isValidChain(newBlocks) && newBlocks.length > app.blockchain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        app.blockchain = newBlocks;
        socketManager.broadcast(messageFactory.queryLatestBlockMsg(app.blockchain), app.sockets);
    } else {
        console.log('Received blockchain invalid');
    }
};
var isValidChain = (blockchainToValidate) => {
    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(genesisBlock)) {
        return false;
    }
    var tempBlocks = [blockchainToValidate[0]];
    for (var i = 1; i < blockchainToValidate.length; i++) {
        if (isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i]);
        } else {
            return false;
        }
    }
    return true;
};
var isValidData = (newBlock, myBlocks) => {
    // simple validation on last block only
    var lastMyBlock = myBlocks[myBlocks.length - 1];
    for (var i = 0; i < newBlock.data.length; i++) {
        var location = newBlock.data[i];
        var myLocation = lastMyBlock.data.find(i => i.Id === location.Id);

        if(location.Transactions.length > 0){
            var lastTransaction = location.Transactions[location.Transactions.length - 1];
            if(location.Owner != myLocation.Owner && lastTransaction.Seller !== myLocation.Owner){
                return false;
            }
        }        
    }
    return true;
};
var handleBlockchainResponse = (message, app) => {
    var receivedBlocks = JSON.parse(message.data).sort((b1, b2) => (b1.index - b2.index));
    var latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    var latestBlockHeld = getLatestBlock(app.blockchain);
    if (latestBlockReceived.index > latestBlockHeld.index) {
        console.log('blockchain possibly behind. We got: ' + latestBlockHeld.index + ' Peer got: ' + latestBlockReceived.index);
        if (latestBlockHeld.hash === latestBlockReceived.previousHash) {
            if(!isValidData(latestBlockReceived, app.blockchain)){
                console.log("Received an invalid block. Do nothing");
                log("Received an invalid block.", LogType.INVALID_BLOK, null);
                return;
            }
            console.log("We can append the received block to our chain");

            app.blockchain.push(latestBlockReceived);
            log("New block has been appended", LogType.NEW_BLOCK, { index: latestBlockReceived.index, hash: latestBlockReceived.hash })
            socketManager.broadcast(messageFactory.queryLatestBlockMsg(app.blockchain), app.sockets);
        } else if (receivedBlocks.length === 1) {
            console.log("We have to query the chain from our peer");
            socketManager.broadcast(messageFactory.queryAllMsg(), app.sockets);
        } else {
            console.log("Received blockchain is longer than current blockchain");
            replaceChain(receivedBlocks, app);
        }
    } else {
        console.log('received blockchain is not longer than current blockchain. Do nothing');
    }
};
var initMessageHandler = (ws, app) => {
    ws.on('message', (data) => {
        var message = JSON.parse(data);
        console.log('Received message' + JSON.stringify(message));
        switch (message.type) {
            case MessageType.QUERY_LATEST:
                socketManager.write(ws, messageFactory.queryLatestBlockMsg(app.blockchain));
                break;
            case MessageType.QUERY_ALL:
                socketManager.write(ws, messageFactory.queryChainMsg(app.blockchain));
                break;
            case MessageType.RESPONSE_BLOCKCHAIN:
                handleBlockchainResponse(message, app);
                break;
            case MessageType.REGISTER_NAME:
                var ip = getSocketIP(ws); 
                var account =  app.accounts.find(x=>x.ip === ip);
                if(!account){
                    console.log(`This websocket ip: ${ip} has not been register yet. Do nothing`);
                }
                account.name = message.name;
                account.connectport = message.connectport;
                console.log(`The websocket ip: ${ip} has been register as ${message.name}`);
                break;
            case MessageType.SYNC_PEERS:
                var latestPeers = JSON.parse(message.data);
                app.accounts.find((i)=>i.ip == getSocketIP(ws)).name = latestPeers.selfname;
                
                var names = app.accounts.map(x=>x.name);
                var connectips = app.accounts.map(i => "ws://" + i.ip.split(":")[0] + ":" + i.connectport);
                var newPeers = latestPeers.peers.filter(i=>names.indexOf(i.name) < 0 
                        && connectips.indexOf("ws://" + i.ip.split(":")[0] + ":" + i.connectport) < 0
                        && i.name != localname);

                if(newPeers){
                    socketManager.connectToPeers(newPeers.map(i=> { return { peer: "ws://" + i.ip.split(":")[0] + ":" + i.connectport };}), app, true);
                }
                log("connected to new peers", LogType.NEW_PEERS, app.accounts);
                break;
            case MessageType.TRIGGER_SYNC_PEERS:                
                socketManager.write(ws, messageFactory.syncPeers(app.accounts));
                break;
        }
    });
};
var initErrorHandler = (ws, app) => {
    var closeConnection = (ws) => {
        console.log('connection failed to peer: ' + ws.url);
        app.sockets.splice(app.sockets.indexOf(ws), 1);
        app.accounts.splice(app.accounts.findIndex(a=>a.ip === getSocketIP(ws)), 1);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};

var getSocketIP = (ws) => ws._socket.remoteAddress + ':' + ws._socket.remotePort;
class socketManager {
    
    static initConnection (name, ws, app) {
        app.sockets.push(ws);
        app.accounts.push(new Account(name, getSocketIP(ws)));
        initMessageHandler(ws, app);
        initErrorHandler(ws, app);
        socketManager.write(ws, messageFactory.registerName(localname, p2p_port));
        socketManager.write(ws, messageFactory.queryChainLengthMsg());
    }
    
    static connectToPeers (newPeers, app, stoptrigger) {
        newPeers.forEach((peerObj) => {
            var ws = new WebSocket(peerObj.peer);
            ws.on('open', () => {
                socketManager.initConnection(null, ws, app);                
                if(!stoptrigger){
                    socketManager.write(ws, messageFactory.triggerSyncPeers());
                }
                else{
                    log("connected to new peers", LogType.NEW_PEERS, app.accounts);
                }                
            });
            ws.on('error', () => {
                console.log('connection failed')
            });
        }); 
    }

    static write(ws, message) { 
        ws.send(JSON.stringify(message))
    }
    static broadcast(message, sockets) { 
        sockets.forEach(socket => socketManager.write(socket, message))
    }
};

var log_ws = null;
var log = (logMessage, logType, data) => {
    if (!logType) {
        logType = "message";
    }
    socketManager.write(log_ws, {
        "name": localname,
        "log_type": logType,
        "log_message": logMessage,
        "time": new Date().getTime(),
        "data": data
    });
}

module.exports = {
    calculateHash,
    messageFactory,
    socketManager,
    isValidNewBlock,
    getLatestBlock,
    setLocalname: (value) => { localname = value; initialed = true; },
    getLocalname: () => { return localname; },
    getLocalNameInitialed:  ()=> initialed,
    log,
    openLogSocket:()=> { 
        log_ws = new WebSocket(log_ws_url);
    }
};