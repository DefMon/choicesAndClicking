/*globals describe, jasmine, it, beforeEach, expect, inject, _, module*/
describe('MathsUtilitiesService', function (){
    var Maths;

    beforeEach(function (){

        // load the module.
        module('ngAlone.utilities');

        inject(function(_mathsUtils_) {
            Maths = _mathsUtils_;
        });
    });

    describe('Maths', function(){
        it('can apply a variety of operators to two given values', function(){
           expect(Maths.applyOperation(1, '+', 4)).toBe(5);
           expect(Maths.applyOperation(6, '-', 4)).toBe(2);
           expect(Maths.applyOperation(2, '*', 4)).toBe(8);
           expect(Maths.applyOperation(8, '/', 4)).toBe(2);
           expect(Maths.applyOperation(8, '=', 4)).toBe(4);
        });

        it('can return a random number between given limits', function(){
            var result = Maths.randBetween(0, 10);
            expect(result).toBeLessThan(11);
            expect(result).toBeGreaterThan(-1);
        });
    });

});

