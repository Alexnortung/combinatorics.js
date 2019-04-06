const utils = require("../utils.js");
const should = require('chai').should();

const factorialList = [
    1
    ,1
    ,2
    ,6
    ,24
    ,120
    ,720
    ,5040
    ,40320
    ,362880
    ,3628800
    ,39916800
    ,479001600
    ,6227020800
    ,87178291200
    ,1307674368000
    ,20922789888000
    ,355687428096000
    ,6402373705728000
       
]


describe("utils.* test", () => {
    describe("utils.factorial(x)",() => {
        const fact = utils.factorial;
        it("should return a number if a number was given", () => {
            fact(5).should.be.a("number");
        });

        it("each number is correct", () => {
            factorialList.forEach((num, i) => {
                if (num < Number.MAX_SAFE_INTEGER) {
                    fact(i).should.equal(num);
                    
                }
            });
        });

    });



});