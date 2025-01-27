class Complex {
    constructor(...args) {
        if (args.length === 1) {
            this.re = args[0].re;
            this.im = args[0].im;
        }
        else if (args.length === 2) {
            this.re = Number(args[0]);
            this.im = Number(args[1]);
        }
    }

    add(other) {
        if (typeof other === 'number') {
            var new_re = this.re + other;
            var new_im = this.im;
        }
        else {
            var new_re = this.re + other.re;
            var new_im = this.im + other.im;
        }
        return new Complex(new_re, new_im);
    }

    sub(other) {
        if (typeof other === 'number') {
            var new_re = this.re - other;
            var new_im = this.im;
        }
        else {
            var new_re = this.re - other.re;
            var new_im = this.im - other.im;
        }
        return new Complex(new_re, new_im);
    }

    mul(other) {
        if (typeof other === 'number') {
            var new_re = this.re * other;
            var new_im = this.im * other;
        }
        else {
            var new_re = this.re * other.re - this.im * other.im;
            var new_im = this.re * other.im + this.im * other.re;
        }
        return new Complex(new_re, new_im);
    }

    div(other) {
        if (typeof other === 'number') {
            var new_re = this.re / other;
            var new_im = this.im / other;
        }
        else {
            const denom = other.re * other.re + other.im * other.im;
            var new_re = (this.re * other.re + this.im * other.im) / denom;
            var new_im = (this.im * other.re - this.re * other.im) / denom;
        }
        return new Complex(new_re, new_im);
    }

    toString() {
        console.log(`${this.re}+${this.im}i`);
    }

    isInteger() {
        return Number.isInteger(this.re) && Number.isInteger(this.im);
    }

    isZero() {
        return this.re === 0 & this.im === 0;
    }
}

export function calculate(type, in_val1, in_val2, radix_1, radix_2) {
    let result = [];

    if (type !== 'C')
        var radix = new Complex(radix_1, 0);
    else
        var radix = new Complex(radix_1, radix_2);

    if (radix.im !== 0) {   // 複整數進位
        var radix_lim = radix_1 * radix_1 + radix_2 * radix_2;
        result = calcValue(new Complex(in_val1, in_val2), radix, radix_lim) || [];
    }   // 負整數進位
    else if (radix.re < 0) {
        var radix_lim = Math.abs(radix_1);
        if (in_val2 != 0) { // 輸入為複數
            const result1 = calcValue(new Complex(in_val1, 0), radix, radix_lim) || [];
            const result2 = calcValue(new Complex(in_val2, 0), radix, radix_lim) || [];
            if (result1.length > 0)    // 實部不為0
                result = [...result1, '+'];
            result = [...result, ...result2, 'i'];
        }
        else    // 輸入為實數
            result = calcValue(new Complex(in_val1, 0), radix, radix_lim) || [];
    }
    else {
        var radix_lim = Math.abs(radix_1);
        if (in_val2 != 0) { // 輸入為複數
            if (in_val1 < 0) {  // 實部為負數
                const result1 = calcValue(new Complex(-in_val1, 0), radix, radix_lim) || [];
                if (result1.length > 0)
                    result = ['-', ...result1];
            }
            else {  // 實部為正數
                const result1 = calcValue(new Complex(in_val1, 0), radix, radix_lim) || [];
                if (result1.length > 0)
                    result = result1;
            }

            if (in_val2 < 0) {  // 虛部為負數
                const result2 = calcValue(new Complex(-in_val2, 0), radix, radix_lim) || [];
                result = [...result, '-', ...result2, 'i'];
            }
            else {  // 虛部為正數
                const result2 = calcValue(new Complex(in_val2, 0), radix, radix_lim) || [];
                if (result.length > 0)
                    result.push('+');
                result = [...result, ...result2, 'i'];
            }
        }
        else if (in_val1 < 0) { // 輸入為負數
            result = ['-', ...calcValue(new Complex(-in_val1, 0), radix, radix_lim)] || [];
        }
        else    // 輸入為正數
            result = calcValue(new Complex(in_val1, 0), radix, radix_lim) || [];
    }

    return result;
}

function calcValue(input, radix, radix_lim) {
    if (input.isZero())
        return [];
    for (let i = 0; i < radix_lim; i++) {
        let q = input.sub(i).div(radix);
        if (q.isInteger()) {
            const result = calcValue(q, radix, radix_lim);
            if (result !== null) {
                result.push(i);
                return result;
            }
        }
    }
    return null;
}
