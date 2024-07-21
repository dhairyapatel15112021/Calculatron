export default class claculate {
    static answer = 0;

    static calulation(stack) {
        console.log(stack);
        while (stack.length > 1) {
            const numberLast = parseFloat(stack.pop());
            const operator = stack.pop();
            const numberFirst = parseFloat(stack.pop());
            let result;
            switch (operator) {
                case '+':
                    result = this.addition(numberFirst, numberLast);
                    break;
                case '-':
                    result = this.substraction(numberFirst, numberLast);
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
            stack.push(result.toString());
        }
        this.answer = stack[0];
        return this.returnAnswer();
    }
    static addition(a, b) {
        return a + b;
    }

    static substraction(a, b) {
        return a - b;
    }

    static multiplication(a, b) {
        return a * b;
    }

    static divison(a, b) {
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
        return 0;
    }
}