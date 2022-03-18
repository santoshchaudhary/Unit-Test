describe('main.js', () => {
    describe('calculate()', function(){
        it('validate Expression if the first number is invalid', function() {
            spyOn(window, 'updateResult'); // .and.stub() is the default one and can be omitted
            calculate('a+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized!');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validate Expression if the second number is invalid', function() {
            spyOn(window, 'updateResult');
            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized!');
            expect(window.updateResult).toHaveBeenCalledTimes(1);

        });

        it('validate Expression if the third number is invalid', function() {
            spyOn(window, 'updateResult');
            calculate('3_3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized!');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });


        it('Calls add()', function(){
            const spy = spyOn(Calculator.prototype, 'add');
            calculate('3+2');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(2);
            expect(spy).toHaveBeenCalledWith(3);
        });

        it('Calls subtract()', function(){
            const spy = spyOn(Calculator.prototype, 'subtract');
            calculate('3-2');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(2);
            expect(spy).not.toHaveBeenCalledWith(3);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('Calls multiply()', function(){
            const spy = spyOn(Calculator.prototype, 'multiply');
            calculate('4*5');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(5);
            expect(spy).not.toHaveBeenCalledWith(4);
            expect(spy).toHaveBeenCalledTimes(1);
        });
        it('Calls Divide()', function(){
            const spy = spyOn(Calculator.prototype, 'divide');
            calculate('6/3');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(3);
            expect(spy).not.toHaveBeenCalledWith(6);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        // it('For Default Operation', function(){

        // })

        it('Calls updateResult (Example for callThrough)', function(){
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callThrough();
            calculate('3*3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.multiply).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(9);
            
        });

        it('Calls updateResult (Example for callFake)', function(){
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(){
                return 'Fake Call'
            });
            calculate('3*3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.multiply).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Fake Call');
            
        });

        it('Calls updateResult (Example for returnValue)', function(){
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'multiply').and.returnValue('returns a value');
            calculate('3*3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.multiply).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('returns a value');
            
        });

        it('Calls updateResult (Example for returnValues)', function(){
            spyOn(window, 'updateResult');
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'second call');
            calculate('3+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(Calculator.prototype.add).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('second call');
            
        });

        it('It does not handle errors', function(){
            spyOn(Calculator.prototype, 'multiply').and.throwError('Some error');
            expect(function(){
                calculate('3*3');
            }).toThrowError('Some error')
        });

    });

    describe('updateResult()', function(){
        beforeAll(function() {
            const element = document.createElement('div');
            element.setAttribute('id', 'result');
            document.body.appendChild(element);
            this.element = element;
        });
        afterAll(function(){
            document.body.removeChild(this.element);
        });
        it('Add result to the DOM element', function(){
            updateResult('5');
            expect(this.element.innerText).toBe('5');

        });

    });

    describe('showVersion()', function(){
        it('Should call the show version method', function(done){
            const element = spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            });
            const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve('0.9'));
            showVersion();
            //expect(Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get).toHaveBeenCalled();
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            //expect(spy()).toEqual('0.9');
            spy().then(function(version){
                expect(element().innerText).toBe(version);
                done();
            })
        });
    });


});