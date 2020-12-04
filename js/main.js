class Calculator {
  constructor(typedNumElement, currentNumElement) {
    this.typedNumElement = typedNumElement;
    this.currentNumElement = currentNumElement;
    this.clear();
  }

  clear() {
    this.currentNum = '';
    this.typedNum = '';
    this.operation = undefined;
  }

  delete() {
    this.currentNum = this.currentNum.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === '.' && this.currentNum.includes('.')) return;
    this.currentNum = this.currentNum.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentNum === '') return;
    if (this.typedNum !== '') {
      this.compute();
    }
    this.operation = operation;
    this.typedNum = this.currentNum;
    this.currentNum = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.typedNum);
    const current = parseFloat(this.currentNum);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '&#247;':
        computation = prev / current;
        break;

      default:
        return;
    }
    this.currentNum = computation;
    this.operation = undefined;
    this.typedNum = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentNumElement.innerText = this.getDisplayNumber(this.currentNum);
    if (this.operation != null) {
      this.typedNumElement.innerText = `${this.getDisplayNumber(
        this.typedNumElement
      )} ${this.operation}`;
    }
  }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const typedNumElement = document.querySelector('[data-typed-num]');
const currentNumElement = document.querySelector('[data-current-num]');

const calculator = new Calculator(typedNumElement, currentNumElement);

numberBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
