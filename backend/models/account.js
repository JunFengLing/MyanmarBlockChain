var uuid = require('uuid');

class Account {
    constructor(name, ip, connectport) {
        this.id = uuid.v1();
        this.name = name;
        this.ip = ip;
        this.connectport = connectport;
    }
}

 module.exports = Account;