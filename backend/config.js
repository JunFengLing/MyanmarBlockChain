var Block = require("./models/block");
var Location = require("./models/location");

var initialEstateList = [
    new Location("1", "Yangoon", "East Yangon", "Botataung", null, null, null, "Yale"),
    new Location("2", "Yangoon", "East Yangon", "Dagon Seikkan", null, null, null, "Panex"),
    new Location("3", "Yangoon", "East Yangon", "East Dagon", null, null, null, "Zack"),
    new Location("4", "Yangoon", "East Yangon", "North Dagon", null, null, null, "Joey"),
    new Location("5", "Yangoon", "East Yangon", "North Okkalapa", null, null, null, "Andy")
];

module.exports = {
    http_port : process.env.HTTP_PORT || 3001,
    p2p_port : process.env.P2P_PORT || 6001,
    cors: "*",
    initialPeers : process.env.PEERS ? process.env.PEERS.split(',') : [],
    genesisBlock : new Block(0, "0", 1465154705, initialEstateList, "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7"),

	log_ws_server: process.env.LOG_SERVER != "false",
	log_ws_server_port: 4001,
	log_ws_url : "ws://172.29.224.48:4001"
};
