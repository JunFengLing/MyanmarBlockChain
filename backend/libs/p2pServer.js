var WebSocket = require("ws");
var { p2p_port, initialPeers, log_ws_server_port, log_ws_server } = require("../config");
var { socketManager, openLogSocket } = require("./helper");
var { initConnection, connectToPeers } = socketManager;

var initP2PServer = (app) => {
    // connet to initial peers 
    connectToPeers(initialPeers, app);

    // create p2p server used to create new peer
    var server = new WebSocket.Server({port: p2p_port});
    server.on('connection', ws => initConnection(null, ws, app));
    console.log('listening websocket p2p port on: ' + p2p_port);

    if (log_ws_server) {
        var monitorServer = new WebSocket.Server({ port: log_ws_server_port });
        monitorServer.on('connection', ws => {
            ws.on('message', (data) => {
                var log = JSON.parse(data);
                app.logs.push(log);
            })
        });
        console.log('listening log websocket server port on: ' + log_ws_server_port);
    }
    openLogSocket();
};

module.exports = { 
    init: initP2PServer
};
