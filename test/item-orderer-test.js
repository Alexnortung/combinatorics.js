const itemOrderer = require('../orderer-items.js');
const should = require('chai').should();
const utils = require('../utils.js');

const item1 = "abc";
const item2 = 1337;
const item3 = {
    "we'll get 'em": "next time"
};

const items = [item1, item2, item3];

const io = itemOrderer(items);
const orderedArray = [];

for (const itemCombination of io) {
     orderedArray.push(itemCombination);
}

const handmadeCombinations = [
    [item1, item2, item3],
    [item1, item3, item2],
    [item2, item1, item3],
    [item2, item3, item1],
    [item3, item1, item2],
    [item3, item2, item1]
]



describe("itemOrderer()", () => {

    
    it("should yield an array for each combination", () => {
        orderedArray.should.all.be.an.instanceof(Array);
    });

    it("its arrays should all have the same length as the input", () => {
        orderedArray.forEach((arr) => {
            arr.length.should.be.equal(items.length);
        });
    });
    
    it("the yielded arrays should have the correct combinations", () => {
        const copyOrdered = orderedArray.slice();

        handmadeCombinations.forEach((hc, i) => {
            let found = false;

            for (let j = 0; j < copyOrdered.length; j++) {
                const cComb = copyOrdered[j];

                const isCorrect = cComb.every((el, index) => el === hc[index]);
                

                if (isCorrect) {
                    found = true;
                    // cComb.should.equal(hc);
                    copyOrdered.splice(j, 1);
                    break;
                }
                
            }

            found.should.equal(true);


        });

        copyOrdered.should.be.empty;

        

    });
    
    it("should yield exactly factorial of the length of the input", () => {
        
        utils.factorial(items.length).should.equal(orderedArray.length);
    });
    
    it("should split the string if that is the only passed argument", () => {
        const str = "abc";
        const strio = itemOrderer(str);
        const charArray = [];

        for (const itemCombination of strio) {
            charArray.push(itemCombination);
        }

        utils.factorial(str.length).should.equal(charArray.length);
        charArray.should.all.be.instanceof(Array);

    });
    
});