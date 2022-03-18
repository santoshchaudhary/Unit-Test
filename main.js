function calculate(value) {
    const inputValue = value;
    const expression = /\+|\*|\-|\//;

    const numbers = inputValue.split(expression);
    const numbersA = +numbers[0];
    const numbersB = +numbers[1];

    const operation = inputValue.match(expression);
    if(isNaN(numbersA) || isNaN(numbersB) || operation === null) {
        updateResult('Expression not recognized!');
        return;
    }
    const operator = operation[0];


    const calculator = new Calculator();
    calculator.add(numbersA);
    // calculator.add(numbersB);

    // console.log(calculator.total);


    let result;
    switch(operator) {
        case '+':
            result = calculator.add(numbersB);
            break;
        case '-':
            result = calculator.subtract(numbersB);
            break;
        case '*':
            result = calculator.multiply(numbersB);
            break;
        case '/':
            result = calculator.divide(numbersB);
            break;
        default:
            result = 'Operation not recognized!';
    }
    updateResult(result);

    

}

function updateResult(result) {
    const element = document.getElementById('result');
    if(element) {
        element.innerText = result;
    }
}
//console.log(result);

function showVersion() {
    const calVersion = new Calculator();
    const element = document.getElementById('version');
    if(element) {
        calVersion.version.then(function(version){
            element.innerText = version;
        })
        
    }
}

document.getElementById('inputValue') &&
// document.getElementById('inputValue').addEventListener('change', calculate)
document.getElementById('inputValue').addEventListener('change', function(){
    calculate(event.target.value);
});