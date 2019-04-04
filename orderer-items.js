const utils = require('./utils.js');

function* orderer(items) {
    const myItems = Array.from(items);

    
    //create loops array to save be able to access factorial calculations from memory
    var loopsArray = [];
    for (let i = myItems.length; i >= 0; i--) {
        loopsArray[i] = utils.factorial(i);
    }

    const loops = loopsArray[myItems.length];
    if (loops <= 0) {
        yield 0;
    }

    for (let i = 0; i < loops; i++) {
        const itemsCopy = myItems.slice();
        const end = [];


        for (let j = 0; j < myItems.length; j++) {
            // some magic
            const cFact = loopsArray[itemsCopy.length];
            const index2 = Math.floor(((i % cFact) / cFact) * itemsCopy.length);
            end.push(itemsCopy[index2]);
            itemsCopy.splice(index2, 1);
        }

        yield end;

    }

    // console.log("orderer finished");
}


module.exports = orderer;
