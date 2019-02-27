const uniqueOrderer = require('./uniqueOrderer.js');
const orderer = require("./orderer.js")

module.exports.permutation = uniqueOrderer;
module.exports.permutationUnfiltered = orderer;
