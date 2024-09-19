const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        const operation = button.getAttribute('data-operation');

        if (number) {
            currentInput += number;
            display.textContent = previousInput + ' ' + operator + ' ' + currentInput;
        } else if (operation) {
            if (previousInput && currentInput && operator) {
                calculate();
            }
            operator = operation;
            previousInput = currentInput;
            currentInput = '';
            display.textContent = previousInput + ' ' + operator;
        } else if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = '';
        } else if (button.id === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = previousInput + ' ' + operator + ' ' + currentInput;
        } else if (button.id === 'equals') {
            if (previousInput && currentInput && operator) {
                calculate();
            }
        }
    });
});

function calculate() {
    let result;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = previous + current;
            break;
        case '-':
            result = previous - current;
            break;
        case '*':
            result = previous * current;
            break;
        case '/':
            result = previous / current;
            break;
        case '%':
            result = previous % current;
            break;
        default:
            return;
    }

    currentInput = result;
    operator = '';
    previousInput = '';
    display.textContent = result;
}
