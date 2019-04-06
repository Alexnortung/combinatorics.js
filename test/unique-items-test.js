const UniqueItems = require('../Unique-items.js');
const should = require('chai').should();



describe("UniqueItems test", () => {
    const inputArray = ["A", "A", "B", "B", "C"];
    const ui = new UniqueItems(inputArray); 
    it(".items should be an array", () => {
        ui.items.should.be.instanceof(Array);
    });

    it(".items' children should all be the unique items", () => {
    });
    
    it(".duplicates children should have the correct keys", () => {
        ui.duplicates.forEach(obj => {
            obj.should.be.instanceof(Object);
            obj.should.all.have.keys("dupes", "value");
            obj.dupes.should.be.a("number");
            obj.value.should.not.be.undefined;
            inputArray.should.include(obj.value);
            ui.items.should.include(obj.value);
            
        });
        
    });

    it(".items should not have duplicates",() => {
        ui.duplicates.forEach((element, i) => {
            ui.duplicates.indexOf(element).should.equal(i);
        });
    });

    it(".getItemDuplicates() returns a number", () => {
        ui.getItemDuplicates(inputArray[0]).should.be.a("number");
    });

    it("has counted the correct amount of items", () => {
        ui.items.forEach(item => {
            let itemCount = 0;

            // console.log(item);
            
            
            inputArray.forEach(inputItem => {
                
                if (inputItem === item) {
                    itemCount++;
                }
                // console.log(item, inputItem, itemCount);
            });

            itemCount.should.equal(ui.getItemCount(item));
            itemCount.should.equal(ui.getItemDuplicates(item) + 1);
        });
    });


});