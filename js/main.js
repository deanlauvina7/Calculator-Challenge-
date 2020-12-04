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

  delete() {}

  appendNum(number) {
    if (number === '.' && this.currentNum.includes('.')) return;
    this.currentNum = this.currentNum.toString() + number.toString();
  }

  chooseOperation(operation) {
    this.operation = operation;
    this.typedNum = this.currentNum;
    this.currentNum = '';
  }

  compute() {}

  updateDisplay() {
    this.currentNumElement.innerText = this.currentNum;
    this.typedNumElement.innerText = this.typedNum;
    this.currentNumElement.innerText = this.currentNum;
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
