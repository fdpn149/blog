class Complex {
    constructor(...args) {
        if (args.length === 1) {
            this.re = Number(args[0]["re"]);
            this.im = Number(args[0]["im"]);
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


export function calculate(type, base, decimal) {
    let dec_type = getDecimalType(decimal);
    let answer = { re: { neg: false, int: [0], dec: [0] }, im: { neg: false, int: [0], dec: [0] } };

    switch (type) {
        case "pos": {
            switch (dec_type) {
                case "pos": {
                    let dec = fix(decimal["re"] % 1);
                    let int = decimal["re"] | 0;
                    calcProcess(answer, type, base, dec, int);
                    break;
                }
                case "neg": {
                    answer["re"]["neg"] = true;
                    let dec = -fix(decimal["re"] % 1);
                    let int = -(decimal["re"] | 0);
                    calcProcess(answer, type, base, dec, int);
                    break;
                }
                case "cpl": {
                    let real = { re: decimal["re"], im: 0 };
                    let imag = { re: decimal["im"], im: 0 };
                    answer["re"] = calculate(type, base, real)["re"];
                    answer["im"] = calculate(type, base, imag)["re"];
                    break;
                }
            }
            break;
        }
        case "neg": {
            switch (dec_type) {
                case "pos":
                case "neg": {
                    let dec = fix(decimal["re"] % 1);
                    let int = decimal["re"] | 0;
                    calcProcess(answer, type, base, dec, int);
                    break;
                }
                case "cpl": {
                    let real = { re: decimal["re"], im: 0 };
                    let imag = { re: decimal["im"], im: 0 };
                    answer["re"] = calculate(type, base, real)["re"];
                    answer["im"] = calculate(type, base, imag)["re"];
                    break;
                }
            }
            break;
        }
        case "bal": {
            switch (dec_type) {
                case "pos":
                case "neg": {
                    let dec = fix(decimal["re"] % 1);
                    let int = decimal["re"] | 0;
                    calcProcess(answer, type, base, dec, int);
                    break;
                }
                case "cpl": {
                    let real = { re: decimal["re"], im: 0 };
                    let imag = { re: decimal["im"], im: 0 };
                    answer["re"] = calculate(type, base, real)["re"];
                    answer["im"] = calculate(type, base, imag)["re"];
                    break;
                }
            }
            break;
        }
        case "bij": {
            switch (dec_type) {
                case "pos": {
                    let dec = fix(decimal["re"] % 1);
                    let int = decimal["re"] | 0;
                    calcProcess(answer, type, base, dec, int);
                    break;
                }
                case "neg": {
                    answer["re"]["neg"] = true;
                    let dec = -fix(decimal["re"] % 1);
                    let int = -(decimal["re"] | 0);
                    calcProcess(answer, type, base, dec, int);
                    break;
                }
                case "cpl": {
                    let real = { re: decimal["re"], im: 0 };
                    let imag = { re: decimal["im"], im: 0 };
                    answer["re"] = calculate(type, base, real)["re"];
                    answer["im"] = calculate(type, base, imag)["re"];
                    break;
                }
            }
            break;
        }
        case "ima": {
            let real = { re: decimal["re"], im: 0 };
            let imag = { re: decimal["im"] / base["im"], im: 0 };
            base = { re: -base["im"] * base["im"], im: 0 };
            let ans_re = calculate("neg", base, real)["re"];
            let ans_im = calculate("neg", base, imag)["re"];
            answer["re"]["int"] = [];
            answer["re"]["dec"] = [];
            if (ans_im["int"].length === 1 && ans_im["int"][0] === 0)
                ans_im["int"] = [];
            if (ans_re["dec"].length === 1 && ans_re["dec"][0] === 0)
                ans_re["dec"] = []
            let i = 0;
            let i_2 = 0;
            while (i_2 < ans_re["int"].length || i_2 < ans_im["int"].length) {
                if (i % 2 === 0)
                    if (i_2 < ans_re["int"].length)
                        answer["re"]["int"].push(ans_re["int"][i_2]);
                    else
                        answer["re"]["int"].push(0);
                else
                    if (i_2 < ans_im["int"].length)
                        answer["re"]["int"].push(ans_im["int"][i_2]);
                    else if (i_2 + 1 < ans_re["int"].length)
                        answer["re"]["int"].push(0);
                i++;
                i_2 = Math.floor(i / 2);
            }
            i = 0;
            i_2 = 0;
            while (i < 100 && (i_2 < ans_re["dec"].length || i_2 < ans_im["dec"].length)) {
                if (i % 2 === 0)
                    if (i_2 < ans_im["dec"].length)
                        answer["re"]["dec"].push(ans_im["dec"][i_2]);
                    else
                        answer["re"]["dec"].push(0);
                else
                    if (i_2 < ans_re["dec"].length)
                        answer["re"]["dec"].push(ans_re["dec"][i_2]);
                    else if (i_2 + 1 < ans_im["dec"].length)
                        answer["re"]["dec"].push(0);
                i++;
                i_2 = Math.floor(i / 2);
            }
            break;
        }
        case "cpl": {
            let base_z = new Complex(base);
            let decimal_z = new Complex(decimal);
            let result = calcProcCpl(base_z, decimal_z);
            if (result.length > 0)
                answer["re"]["int"] = result;
            break;
        }
        case "dec": {
            switch (dec_type) {
                case "pos": {
                    let result = calcProcDec(base["re"], decimal["re"]);
                    answer["re"] = { ...answer["re"], ...result };
                    break;
                }
                case "neg": {
                    answer["re"]["neg"] = true;
                    let result = calcProcDec(base["re"], -decimal["re"]);
                    answer["re"] = { ...answer["re"], ...result };
                    break;
                }
                case "cpl": {
                    let real = { re: decimal["re"], im: 0 };
                    let imag = { re: decimal["im"], im: 0 };
                    answer["re"] = calculate(type, base, real)["re"];
                    answer["im"] = calculate(type, base, imag)["re"];
                    break;
                }
            }
            break;
        }
    }
    return answer;
}

function calcProcess(answer, type, base, dec, int) {
    let decAns = mulDec(type, base["re"], dec);
    int += decAns[0];
    decAns.shift();
    let intAns = divInt(type, base["re"], int);
    if (intAns.length > 0)
        answer["re"]["int"] = intAns;
    if (decAns.length > 0)
        answer["re"]["dec"] = decAns;
}

function getDecimalType(decimal) {
    if (decimal["im"] !== 0)
        return "cpl";
    else if (decimal["re"] < 0)
        return "neg";
    return "pos";
}

function getMulUpOffset(type, base) {
    switch (type) {
        case "neg":
            return (-base - 1) / (base * base - 1);
        case "bal":
            return 0.5;
        case "bij":
            return base;
    }
    return base;
}

function getMulLowOffset(type, base) {
    switch (type) {
        case "bal":
            return -0.5;
        case "bij":
            return 1 / (base - 1);
    }
    return 0;
}

function adjMulVal(type, up, low, m_dec, m_int) {
    switch (type) {
        case "pos":
            return [0, m_dec];
        case "neg": {
            if (m_dec > up)
                return [1, fix(m_dec - 1)];
            return [0, m_dec];
        }
        case "bal": {
            if (m_dec >= up)
                return [1, fix(m_dec - 1)];
            else if (m_dec < low)
                return [-1, fix(m_dec + 1)];
            return [0, m_dec];
        }
        case "bij": {
            if (m_dec < low) {
                if (m_dec === 0 && m_int <= up)
                    return [0, m_dec];
                return [-1, fix(m_dec + 1)];
            }
        }
    }
    return [0, m_dec];
}

function mulDec(type, base, value) {
    let count = 0;
    const result = [];
    let up = getMulUpOffset(type, base);
    let low = getMulLowOffset(type, base);
    let adj = adjMulVal(type, up, low, value, 0);
    result.push(adj[0]);
    let m_dec = adj[1];
    while (count < 100 && m_dec !== 0) {
        let m = fix(m_dec * base);
        let m_int = m | 0;
        m_dec = fix(m % 1);
        adj = adjMulVal(type, up, low, m_dec, m_int);
        m_int += adj[0];
        m_dec = adj[1];
        result.push(m_int);
        count++;
    }
    return result;
}

function getDivLowOffset(type, base) {
    switch (type) {
        case "pos":
        case "neg":
            return 0;
        case "bal":
            return -(Math.abs(base) - 1) / 2;
        case "bij":
            return 1;
    }
    return 0;
}

function divInt(type, base, value) {
    const result = [];
    let q = value;
    let low = getDivLowOffset(type, base);
    let new_value;
    while (q !== 0) {
        let i = low - 1;
        do {
            i++;
            new_value = (q - i) / base;
        } while (fix(new_value % 1) !== 0);
        q = new_value | 0;
        result.push(i);
    }
    return result;
}


function calcProcDec(base, decimal) {
    let factor = Math.floor(Math.log(decimal) / Math.log(base));
    let i = factor;
    let q = 1;
    while (i > 0) {
        q *= base;
        i--;
    }
    while (i < 0) {
        q /= base;
        i++;
    }

    const result = { int: [], dec: [] };
    let max = Math.ceil(base) - 1;
    let remain = decimal;
    while (factor >= -100 && remain > 0) {
        for (i = 1; i <= max + 1; i++) {
            if (i * q > remain) {
                i--;
                if (factor < 0)
                    result["dec"].push(i)
                else
                    result["int"].unshift(i)
                remain -= i * q;
                break;
            }
        }
        factor--;
        q /= base;
    }
    if (result["int"].length === 0)
        result["int"] = [0];
    if (result["dec"].length === 0)
        result["dec"] = [0];
    return result;
}


function calcProcCpl(base, decimal) {
    const result = [];
    let q = decimal;
    const max = base.re * base.re + base.im * base.im;
    let new_value;
    while (!q.isZero()) {
        let i = 0;
        do {
            new_value = q.sub(i).div(base);
            i++;
        } while (i < max && !new_value.isInteger());
        q = new_value;
        result.push(i - 1);
    }
    return result;
}

function fix(num) {
    // return +(Math.round(num + 'e+12') + 'e-12');
    if (num < 0) {
        num = -num;
        return Number(-(num.toFixed(12)));
    }
    return Number(num.toFixed(12));
}