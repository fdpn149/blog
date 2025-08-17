import { pow } from "mathjs";
import { divide } from "mathjs";
import { add } from "mathjs";
import { subtract } from "mathjs";
import { ceil } from "mathjs";
import { floor } from "mathjs";
import { equal } from "mathjs";
import { isInteger } from "mathjs";
import { multiply } from "mathjs";
import { round } from "mathjs";
import { complex } from "mathjs";

function numFix(num) {
    return round(num, 6);
}

function divisible(dividend, divisor) {
    if (equal(dividend, 0))
        return {
            "status": true,
            "value": dividend
        }
    const result = numFix(divide(dividend, divisor));

    return {
        "status": isInteger(result.re) && isInteger(result.im),
        "value": result
    }
}

function cumulatedDiv(base, number, divMin, divMax, remainCount) {
    if (remainCount <= 0 || equal(number, 0))
        return {
            "valid": true,
            "value": []
        }

    for (let i = divMin; i <= divMax; i++) {
        const d = divisible(subtract(number, i), base);
        console.log(`${d.value}\n${i}`)
        if (d.status == true) {
            const result = cumulatedDiv(base, d.value, divMin, divMax, remainCount - 1);
            if (result.valid) {
                return {
                    "valid": true,
                    "value": [i, ...result.value]
                }
            }
        }
    }
    return { "valid": false }
}

function cumulatedMul(base, number, bound, remainCount) {
    if (remainCount <= 0 || number === 0)
        return {
            "valid": true,
            "value": []
        }

    number = number * base;

    let value = 0;
    if (number > bound) {
        const extra = ceil(numFix(number - bound));
        value += extra;
        number -= extra;
    }

    const result = cumulatedMul(base, number, bound, remainCount - 1);

    return {
        "valid": true,
        "value": [value, ...result.value]
    }
}

export function radixConvert(base, number, iteration = 10) {
    return new Promise((resolve, reject) => {
        // base = complex(base);
        // number = complex(number);
        // number = numFix(multiply(number, pow(base, iteration)));
        // const numRound = complex(round(number.re), round(number.im));
        // const numRemain = complex(number.re - numRound.re, number.im - numRound.im);
        // const roundResult = cumulatedDiv(base, numRound, 0, 9, iteration * 2);
        // resolve(roundResult)
        number = numFix(divide(number, pow(base, iteration)));

        const bound = divide(2, 5.25);

        let value = 0;
        if (number > bound) {
            const extra = ceil(numFix(number - bound));
            value += extra;
            number -= extra;
        }

        const result = cumulatedMul(base, number, bound, iteration * 3.0);
        result.value = [value, ...result.value];
        resolve(result);
    })
}