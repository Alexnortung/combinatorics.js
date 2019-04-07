const uniqueOrderer = require('../uniqueOrderer.js');
const UniqueItems = require("../unique-items.js");
const should = require('chai').should();




describe("uniqueOrderer()", () => {
    describe("uniqueOrderer(string)", () => {


        it("yields an array with exactly the length of the input", () => {
            const dInputString = "AABCE";
            for (let i = 2; i < dInputString.length; i++) {
                const cInputString = dInputString.substring(0, i);
                const u = uniqueOrderer(cInputString);

                for (const cmb of u) {
                    cmb.should.be.instanceof(Array);
                    cmb.length.should.equal(cInputString.length);
                    cmb.forEach(s => {
                        s.should.be.a("string");
                        s.length.should.equal(1);
                    });
                }
                
            }
        });

        const combinations = [];
        const input = "ABCAB";
        it("yields a combination exactly once", () => {

            const u = uniqueOrderer(input);

            for (const cmb of u) {
                combinations.forEach(cmb2 => {
                    cmb.should.not.deep.equal(cmb2);
                });
                combinations.push(cmb);
            }
        });

        it("all combinations should contain the character as many times as it is included in the input", () => {
            const uiInput = new UniqueItems(input);

            combinations.forEach(cmb => {
                const ui = new UniqueItems(cmb);
                uiInput.uniques.forEach(unique => {
                    uiInput.getItemCount(unique).should.equal(ui.getItemCount(unique));
                });

            });
        });
    });

    describe("uniqueOrderer(Array)", ()=> {
        const arr = ["a", "b"];
        const dInput = ["String", arr, {object: "val"}, arr, "A", "A"];
        const combinations = [];
        it("yields an array with exactly the length of the input", () => {
            for (let i = 1; i < dInput.length; i++) {
                const cInput = dInput.slice(0, i);
                const u = uniqueOrderer(cInput);

                for (const cmb of u) {
                    
                    cmb.should.be.instanceof(Array);
                    cmb.length.should.equal(cInput.length);
                    if (i == dInput.length -1) {
                        combinations.push(cmb);
                        
                    }
                }

            }
        });

        it("yields a combinations exactly once", ()=> {
            combinations.forEach((cmb, i) => {
                for (let j = i + 1; j < combinations.length; j++) {
                    const cmb2 = combinations[j];
                    
                    
                    let itemsDifferent = false;
                    cmb.forEach((item, k) => {
                        if (item !== cmb2[k]) {
                            itemsDifferent = true;
                        }
                    });

                    itemsDifferent.should.be.equal(true);
                }
            });
        });


    });
});