let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').value = displayValue;
}

function calculate() {
    try {
        const result = eval(displayValue);
        document.getElementById('display').value = result;
        displayValue = result.toString();
    } catch (error) {
        alert('Invalid input!');
        clearDisplay();
    }
}

function toggleMode() {
    const body = document.querySelector('body');
    const calculator = document.querySelector('.calculator');
    const currentMode = body.classList.contains('dark-mode') ? 'light' : 'dark';

    if (currentMode === 'dark') {
        body.classList.add('dark-mode');
        calculator.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        calculator.classList.remove('dark-mode');
    }
}