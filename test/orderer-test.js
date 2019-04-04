const strOrderer = require('../orderer.js');
const should = require('chai').should();

function createOrderedArray(string) {
    const o = strOrderer(string);
    const arr = [];
    for (const newStr of o) {
        arr.push(newStr);
    }
    return arr;
}

describe("String orderer test", () => {
    const str = "abc";
    const o = strOrderer(str);
    const orderedArray = [];
    
    for (const newStr of o) {
        orderedArray.push(newStr);
    }

    const handmadeOrders = [
        "abc",
        "acb",
        "bac",
        "bca",
        "cab",
        "cba",
    ];


    it("should yield one of every combination of the characters in a string", ()=> {
        const orderedArrayCopy = orderedArray.slice();
        
        handmadeOrders.forEach((val, i) => {
             var index = orderedArrayCopy.indexOf(val);
             
             index.should.not.equal(-1);
             orderedArrayCopy.splice(index, 1);
        });

        orderedArrayCopy.should.be.empty;
        
    });


    it("should still yield the same combinations no matter the order", () => {
        const order1 = createOrderedArray("cba");
        const order2 = createOrderedArray("bac");
        const order3 = createOrderedArray("acb");

        handmadeOrders.forEach((val) => {
            var index1 = order1.indexOf(val);
            var index2 = order2.indexOf(val);
            var index3 = order3.indexOf(val);

            [index1, index2, index3].should.all.not.equal(-1);
            order1.splice(index1, 1);
            order2.splice(index2, 1);
            order3.splice(index3, 1);
        });

    });

});