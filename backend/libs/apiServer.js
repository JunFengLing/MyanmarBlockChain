var express = require("express");
var bodyParser = require('body-parser');
var uuid = require('uuid');
var Block = require("../models/block");
var Location = require("../models/location");
var LogType = require("../models/log");
var {Transaction, TransactionStatus} = require("../models/transaction");
var { http_port, cors } = require("../config");
var { calculateHash, isValidNewBlock, getLatestBlock, messageFactory, socketManager, getLocalname, setLocalname, log, getLocalNameInitialed } = require("./helper");
var { broadcast, connectToPeers } = socketManager;

var isValidTransaction = (data, blockchain) => {
    var locationId = data.Id;
    var buyer = data.Buyer;
    var seller = data.Seller;
    var latestBlock = getLatestBlock(blockchain);
    var location = latestBlock.data.find(function(i){
        return i.Id == locationId && i.Owner == seller && i.Owner == getLocalname();
    });
    return location;
};

var generateBlockData = (data, blockchain) => {
    var locationId = data.Id;
    var buyer = data.Buyer;
    var seller = data.Seller;
    var price = data.Price;
    var previousBlock = getLatestBlock(blockchain);
    var newBlockData = JSON.parse(JSON.stringify(previousBlock.data));
    var location = newBlockData.find(function(i){
        return i.Id == locationId;
    });
    location.Owner = buyer;
    location.Transactions.push(new Transaction(uuid.v1(), location.Id, price, buyer, seller, null, new Date(),TransactionStatus.Approval));
    return newBlockData;
};

var generateNextBlock = (blockData, blockchain) => {
    var previousBlock = getLatestBlock(blockchain);
    var nextIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().getTime() / 1000;
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData);
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash);
};
var addBlock = (newBlock, blockchain) => {
    if (isValidNewBlock(newBlock, getLatestBlock(blockchain))) {
        blockchain.push(newBlock);
    }
};

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', cors);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
var initHttpServer = (app) => {
    var server = express();
    server.use(bodyParser.json());
    server.use(allowCrossDomain);

    server.get('/blocks', (req, res) => res.send(JSON.stringify(app.blockchain)));
    server.get('/location', (req, res) => {
        var locationId = req.query.id;
        var latestBlock = getLatestBlock(app.blockchain);
        var location = latestBlock.data.find(function(i){
            return i.Id == locationId;
        });
        res.send(JSON.stringify(location));
    });
    server.post('/transaction', (req, res) => {
        if(!isValidTransaction(req.body.data, app.blockchain)){
            res.status(400);
            res.send({
                'errormessage': "not valid transaction",
            });
            return;
        }        
        var newBlockData = generateBlockData(req.body.data, app.blockchain);
        var newBlock = generateNextBlock(newBlockData, app.blockchain);
        addBlock(newBlock, app.blockchain);
        log("New block has been appended", LogType.NEW_BLOCK , { index: newBlock.index, hash: newBlock.hash });
        broadcast(messageFactory.queryLatestBlockMsg(app.blockchain), app.sockets);
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    server.get('/peers', (req, res) => {
        res.send(app.accounts);
    });
    server.get('/logs', (req, res) => {
        res.send(app.logs);
    });
    server.get('/localname', (req, res) => {
        res.send({name: getLocalname(), initial: getLocalNameInitialed()});
    });
    server.post('/localname', (req, res) => {
        setLocalname(req.body.name);
        log("log client connected", LogType.LOG_CLIENT_CONNECTED, null);
        res.send();
    });
    server.post('/addPeer', (req, res) => {
        setLocalname(req.body.name);
        connectToPeers([{ peer: req.body.peer}], app);       
        res.send();
    });
    server.listen(http_port, () => console.log('Listening http on port: ' + http_port));
};

module.exports = { 
    init: initHttpServer
};