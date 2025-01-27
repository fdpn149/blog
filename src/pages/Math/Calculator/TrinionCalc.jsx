import Page from "../../Page";
import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";
import { useEffect } from "react";

function TrinionCalc() {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [answer, setAnswer] = useState(0);

    function toTokens(inputValue) {
        const tokens = [];
        for (let i = 0; i < inputValue.length; i++) {
            if (inputValue[i] === '-') {
                let value = '-';
                i++;
                if (inputValue[i] === 'i' || inputValue[i] === 'j') {
                    tokens.push("-1" + inputValue[i]);
                }
                else {
                    while (i < inputValue.length && (!isNaN(inputValue[i]) || inputValue[i] === '.' || inputValue[i] === 'i' || inputValue[i] === 'j')) {
                        value += inputValue[i];
                        i++;
                    }
                    i--;
                    tokens.push(value);
                }
            }
            else if (!isNaN(inputValue[i])) {
                let value = [inputValue[i]];
                i++;
                while (i < inputValue.length && (!isNaN(inputValue[i]) || inputValue[i] === '.' || inputValue[i] === 'i' || inputValue[i] === 'j')) {
                    value += inputValue[i];
                    i++;
                }
                i--;
                tokens.push(value);
            }
            else if (inputValue[i] === 'i' || inputValue[i] === 'j') {
                tokens.push('1' + inputValue[i]);
            }
            else {
                tokens.push(inputValue[i]);
            }
        }
        return tokens;
    }

    function calculate(inputValue) {
        const tokens = toTokens(inputValue);
        console.log(tokens);

        const rotates = [];
        let i_sum = 0;
        let i = 0;

        while (i < tokens.length) {
            while (i < tokens.length && tokens[i][tokens[i].length - 1] !== 'j') {
                if (tokens[i][tokens[i].length - 1] === 'i') {
                    i_sum += Number(tokens[i].slice(0, tokens[i].length - 1));
                }
                i++;
            }
            if (i < tokens.length && tokens[i][tokens[i].length - 1] === 'j') {
                rotates.push(i_sum);
            }
            i++;
        }
        console.log(rotates);
        console.log(i_sum);
    }

    return (
        <>
            <Page pathList={['數學', '計算機', '波峰三元數']}>
                <textarea value={inputValue} onChange={(event) => { setInputValue(event.target.value); }} />
                <button onClick={() => { setAnswer(calculate(inputValue)) }}>計算</button><br />
                <p>{answer}</p>
            </Page>
        </>
    );
}

export default TrinionCalc;