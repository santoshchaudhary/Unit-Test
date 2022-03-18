// test 
describe('calculator.js', function() {
    describe('Calculator', function(){

        let calculator;
        let calculator2;
        beforeEach(() => {
            // executes before execution of each spec in the suite
            calculator = new Calculator();
            calculator2 = new Calculator();
        });

        afterEach(() => {
            // executes after execution of each spec in the suite
            // cleanup after the spec execution
            
        });
        // Common Constructor matcher

        // toBeNull
        it('toBeNull : Can overwrite total value', function(){
            calculator.total = null;
            expect(calculator.total).toBeNull();
        });

        // toContain Matcher
        it('toContain : Should have the calculator Constructor', function(){
            let arr = [1, 2, 3, 4];
            expect(arr).toContain(3);
            expect(calculator.constructor.name).toContain('Calc')
        });

        // toBe Matcher
        it('toBe: Should initialize the total', function(){
            let person1 = { name: 'john' };
            expect(person1).toBe(person1);
            expect(calculator.total).toBeFalsy();
            expect(calculator.total).toBe(0);
        });

        // toMatch
        // it('toMatch : Should return total a number', function(){
        //     calculator.total = 10;
        //     expect(calculator.add(10)).toBe(20);
        //     expect(calculator.total).toMatch(/-?\d+/);
        //     expect(typeof calculator.total).toMatch('number')
        // });

        // Anything matcher
        // it('Anything matcher : Should return the total as value', function(){
        //     calculator.total = 10;
        //     expect(calculator.total).toEqual(jasmine.anything());
        //     expect(null).toEqual(jasmine.anything());
        //     expect(undefined).toEqual(jasmine.anything());
        // });

        // any matcher
        // it('Any matcher : should be an instance', function() {
        //     jasmine.addMatchers(CustomMatcher);
        //     const calculator = new Calculator();
        //     calculator.total = 10;
        //     expect(calculator).toEqual(jasmine.any(Object));
        //     expect(calculator).toEqual(jasmine.any(Calculator));
        //     expect(calculator.total).toEqual(jasmine.any(Number));
        //     // Custom Matcher
        //     expect(calculator).toBeCalculator();
        // });

        // Object containg matcher
        it('Object Containg: should contain total as key', function() {
            calculator.total = 10;
            expect(calculator).toEqual(
                jasmine.objectContaining({
                    total: 10
                })
            );
            expect(typeof calculator.total).toEqual(
                jasmine.stringContaining('number')
            );
        });



        describe('add()', function(){
            it('should add number to the total', () => {
                calculator.add(5);
                expect(calculator.total).toBe(5);
            });
        });

        describe('subtract()', function(){
            it('should subtract number from the total', () => {
                // TODO : Expectation
                calculator.total = 30;
                calculator.subtract(5);
                expect(calculator.total).toBe(25);
            });
        });

        describe('multiply()', function(){
            it('Multiply: should multiply number with the total', () => {
                // TODO : Expectation
                calculator.total = 10;
                calculator.multiply(5);
                expect(calculator.total).toBe(50);
            });

            //toBeNaN()
            // it('Does not hanle NaN multiply', function(){
            //     const calculator = new Calculator();
            //     calculator.total = 10;
            //     calculator.multiply('a');
            //     expect(calculator.total).toBeNaN();
            // });

        });

        describe('divide()', function(){
            it('Divide: should divide number with the total', () => {
                // TODO : Expectation
                calculator.total = 10;
                calculator.divide(5);
                expect(calculator.total).toBe(2);
            });

            // toThrow matcher
            // it('Should throw error when divide by zero', function() {
            //     const calculator = new Calculator();
            //     calculator.total = 10;
            //     expect(function(){
            //         calculator.divide(0);
            //     }).toThrow();
            //     // expect(function(){
            //     //     calculator.divide(0);
            //     // }).toThrow(new Error('Number can not be Zero'));
            // });

            // toThrow Error matcher
            // it('Should throw error with message when divide by zero', function(){
            //     const calculator = new Calculator();
            //     calculator.total = 10;
            //     expect(function(){
            //         calculator.divide(0)
            //     }).toThrowError();

            //     // expect(function(){
            //     //     calculator.divide(0)
            //     // }).toThrowError('Number cannot be zero!');

            //     // expect(function(){
            //     //     calculator.divide(0)
            //     // }).toThrowError(Error, 'Number cannot be zero!');
            // });
            
        });

        describe('getVersion()', function() {
            it('Fetches version from the external source', async function() { //done
                spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('{"version": "0.4"}')));
                //calculator.version.then(function(version){
                const version = await calculator.version
                expect(version).toBe('0.4');
               // done();
                
            });
        });




    });
});