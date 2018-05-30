'use strict';
var apiServer = require("./libs/apiServer");
var p2pServer = require("./libs/p2pServer");
var { genesisBlock } = require("./config");

class App {
    constructor() {
        this.blockchain = [genesisBlock];
        this.sockets = [];
        this.accounts = [];
        this.logs = [];
    }
    run() {
        apiServer.init(this);
        p2pServer.init(this);
    }
}

new App().run();