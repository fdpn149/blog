export function calculate(inputValue) {
    let tokens = parse(inputValue);
    tokens = mergeTokens(tokens);
    console.log(tokens);

    let postfix = toPostfix(tokens);
    console.log(postfix);

    const result = evaluate(postfix);
    console.log(result);
    return result;
}

function isNumber(token) {  // 把尾巴的ijk去掉，看前面是不是數字
    if (token.length > 1)
        if (!(token.length === 2 && token[0] === '-'))
            token = token.slice(0, token.length - 1);   // 把尾巴的ijk去掉
    return !isNaN(token);
}

class Quaternion {
    constructor(arg1, arg2, arg3, arg4) {
        this.i = 0;
        this.j = 0;
        this.k = 0;
        this.r = 0;

        if (arg2 === undefined || arg3 === undefined || arg4 === undefined) {
            if (arg1.length > 1) {
                if (arg1[arg1.length - 1] === 'i')
                    this.i = Number(arg1.slice(0, arg1.length - 1));
                else if (arg1[arg1.length - 1] === 'j')
                    this.j = Number(arg1.slice(0, arg1.length - 1));
                else if (arg1[arg1.length - 1] === 'k')
                    this.k = Number(arg1.slice(0, arg1.length - 1));
                else
                    this.r = Number(arg1);
            }
            else
                this.r = Number(arg1);
        }
        else {
            this.r = Number(arg1);
            this.i = Number(arg2);
            this.j = Number(arg3);
            this.k = Number(arg4);
        }
    }

    add(other) {
        const new_r = this.r + other.r;
        const new_i = this.i + other.i;
        const new_j = this.j + other.j;
        const new_k = this.k + other.k;
        return new Quaternion(new_r, new_i, new_j, new_k);
    }
    sub(other) {
        const new_r = this.r - other.r;
        const new_i = this.i - other.i;
        const new_j = this.j - other.j;
        const new_k = this.k - other.k;
        return new Quaternion(new_r, new_i, new_j, new_k);
    }
    mul(other) {
        const new_r = this.r * other.r - this.i * other.i - this.j * other.j - this.k * other.k;
        const new_i = this.r * other.i + this.i * other.r + this.j * other.k - this.k * other.j;
        const new_j = this.r * other.j - this.i * other.k + this.j * other.r + this.k * other.i;
        const new_k = this.r * other.k + this.i * other.j - this.j * other.i + this.k * other.r;
        return new Quaternion(new_r, new_i, new_j, new_k);
    }
    div(other) {
        const square = other.r * other.r + other.i * other.i + other.j * other.j + other.k * other.k;
        const new_other = new Quaternion(other.r / square, -other.i / square, -other.j / square, -other.k / square);
        return this.mul(new_other);
    }
    toString() {
        let display = "";
        if (this.r !== 0) display += this.r;
        if (this.i !== 0) display += (display.length === 0
            ? ""
            : this.i < 0
                ? ""
                : "+"
        ) + this.i + 'i';
        if (this.j !== 0) display += (display.length === 0
            ? ""
            : this.j < 0
                ? ""
                : "+"
        ) + this.j + 'j';
        if (this.k !== 0) display += (display.length === 0
            ? ""
            : this.k < 0
                ? ""
                : "+"
        ) + this.k + 'k';
        return display;
    }
}

function evaluate(postfix) {
    const values = [];

    for (let i = 0; i < postfix.length; i++) {
        if (isNumber(postfix[i]))
            values.push(new Quaternion(postfix[i]));
        else {
            switch (postfix[i]) {
                case '+': {
                    const newValue = values[values.length - 2].add(values[values.length - 1]);
                    values[values.length - 2] = newValue;
                    values.pop();
                    break;
                }
                case '-': {
                    const newValue = values[values.length - 2].sub(values[values.length - 1]);
                    values[values.length - 2] = newValue;
                    values.pop();
                    break;
                }
                case '*': {
                    const newValue = values[values.length - 2].mul(values[values.length - 1]);
                    values[values.length - 2] = newValue;
                    values.pop();
                    break;
                }
                case '/': {
                    const newValue = values[values.length - 2].div(values[values.length - 1]);
                    values[values.length - 2] = newValue;
                    values.pop();
                    break;
                }
            }
        }
    }

    return values[0].toString();
}

function weight(sign) {
    switch (sign) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '(':
            return 0;
    }
}

function toPostfix(tokens) {
    let postfix = [];
    let stack = [];

    tokens.splice(0, 0, '(');
    tokens.push(')');

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (isNumber(token))
            postfix.push(token);
        else if (token === '(')
            stack.push('(');
        else if (token === ')') {
            while (stack[stack.length - 1] !== '(') {
                postfix.push(stack.pop());
            }
            stack.pop();
        }
        else {
            while (stack.length > 0 && weight(stack[stack.length - 1]) >= weight(token)) {
                postfix.push(stack.pop());
            }
            stack.push(token);
        }
    }

    return postfix;
}

function parse(inputValue) {
    let tokens = [];

    let num_sum = 0;
    let num_valid = false;

    // 只對數字做處理，其餘全保留
    for (let i = 0; i < inputValue.length; i++) {
        if (inputValue[i] === '(' || inputValue[i] === ')' || inputValue[i] === '.'
            || inputValue[i] === '+' || inputValue[i] === '-'
            || inputValue[i] === '*' || inputValue[i] === '/'
            || inputValue[i] === 'i' || inputValue[i] === 'j' || inputValue[i] === 'k') {
            if (num_valid) {
                tokens.push(num_sum);
                num_valid = false;
                num_sum = 0;
            }
            tokens.push(inputValue[i]);
        }
        else {
            if (!isNaN(inputValue[i])) {
                if (num_valid === false)
                    num_valid = true;
                num_sum = num_sum * 10 + Number(inputValue[i]);
            }
            else
                return; // Error
        }
    }
    if (num_valid) {
        tokens.push(num_sum);
    }

    return tokens;
}

function mergeTokens(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '-') {    // 負號需判斷前一個不能是數字且下一個必須是數字
            if (i + 1 < tokens.length) {
                if (i - 1 < 0 || (!isNumber(tokens[i - 1]) && tokens[i - 1] !== ')')) {
                    if (tokens[i + 1] === 'i' || tokens[i + 1] === 'j' || tokens[i + 1] === 'k') {
                        tokens[i + 1] = "-1" + tokens[i + 1];
                        tokens.splice(i, 1);
                        i--;
                    }
                    else if (!isNaN(tokens[i + 1])) {
                        tokens[i + 1] = '-' + tokens[i + 1];
                        tokens.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        else if (!isNaN(tokens[i])) {   // 數字ijk 或 數字.數字
            if (i + 1 < tokens.length) {
                if (tokens[i + 1] === 'i' || tokens[i + 1] === 'j' || tokens[i + 1] === 'k') {
                    tokens[i + 1] = tokens[i] + tokens[i + 1];
                    tokens.splice(i, 1);
                    i--;
                }
                else if (tokens[i + 1] === '(') {
                    tokens.splice(i + 1, 0, '*');
                    i++;
                }
                else if (i + 2 < tokens.length && tokens[i + 1] === '.' && !isNaN(tokens[i + 2])) {
                    tokens[i + 2] = tokens[i] + '.' + tokens[i + 2];
                    tokens.splice(i, 2);
                    i--;
                }
            }
        }
        else if (tokens[i] === ')') {   // 括號後面自動生乘號
            if (i + 1 < tokens.length) {
                if (!isNaN(tokens[i + 1]) || tokens[i + 1] === 'i' || tokens[i + 1] === 'j' || tokens[i + 1] === 'k') {
                    tokens.splice(i + 1, 0, '*');
                    i++;
                }
                else if (tokens[i + 1] === '(') {
                    tokens.splice(i + 1, 0, '*');
                    i++;
                }
            }

        }
        else if (tokens[i] === 'i' || tokens[i] === 'j' || tokens[i] === 'k') { // 只有ijk前面多補係數1
            tokens[i] = '1' + tokens[i];
        }
    }

    return tokens;
}