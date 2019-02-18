const uniqueOrderer = require('./uniqueOrderer.js');
const orderer = require("./orderer.js")

module.exports.permutation = orderer;
module.exports.permutationFiltered = uniqueOrderer;
