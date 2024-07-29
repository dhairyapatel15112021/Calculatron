export default class calculate {
    static answer = 0;
    static mulDivArray = ["x", "/"];
    static addDiffArray = ["+", "-"];

    static calulation(stack) {
        while (stack.length > 1) {
            let index = stack.findIndex(element => this.mulDivArray.includes(element));
            if (index === -1) {
                index = stack.findIndex(element => this.addDiffArray.includes(element));
            }
            const numberLast = parseFloat(stack[index + 1]);
            const operator = stack[index];
            const numberFirst = parseFloat(stack[index - 1]);
            let result;
            switch (operator) {
                case '+':
                    result = this.addition(numberFirst, numberLast);
                    break;
                case '-':
                    result = this.subtraction(numberFirst, numberLast);
                    break;
                case 'x':
                    result = this.multiplication(numberFirst, numberLast);
                    break;
                case '/':
                    result = this.divison(numberFirst, numberLast);
                    break;
                default:
                    return stack[0];
            }
            stack.splice(index + 2, 0, result.toString());
            stack.splice(index - 1, 3);
        }
        this.answer = stack[0];
        return this.returnAnswer();
    }

    static addition(a, b) {
        return a + b;
    }

    static subtraction(a, b) {
        return a - b;
    }

    static multiplication(a, b) {
        return a * b;
    }

    static divison(a, b) {
        if (b === 0) {
            return "Error";
        }
        return a / b;
    }

    static negation(stack) {
        this.calulation(stack);
        return this.returnAnswer() * -1;
    }

    static percentage(stack) {
        this.calulation(stack);
        return this.returnAnswer() / 100;
    }

    static returnAnswer() {
        return this.answer;
    }

    static clearAnswer() {
        this.answer = 0;
        return 0;
    }
    
}