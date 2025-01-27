import './RadixCalc.css'
import Page from "../../Page";
import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { calculate } from "../../../utils/Radix";
import { SingleValue, ValueContainer } from 'react-select/animated';

function RadixCalc() {
    const theme = useTheme();

    const options = [
        { value: "Z", label: "整數" },
        { value: "C", label: "複整數" }
    ]

    const [radixValue1, setRadixValue1] = useState('');
    const [radixValue2, setRadixValue2] = useState('');
    const [radixType, setRadixType] = useState('');
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const [answer, setAnswer] = useState('');

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme === 'dark'
                ? 'black'
                : 'white'
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            const color_selected = theme === 'dark'
                ? '#000000'
                : '#ffffff';
            const color_unselected = theme === 'dark'
                ? '#ffffff'
                : '#000000';
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? color_unselected
                        : isFocused
                            ? color_unselected + '20'
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? color_selected
                        : color_unselected,
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
        menu: (styles) => ({
            ...styles,
            backgroundColor: theme === 'dark'
                ? 'black'
                : 'white'
        }),
        // input: (styles) => ({ ...styles, ...dot() }),
        // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles) => ({
            ...styles,
            color: theme === 'dark'
                ? 'white'
                : 'black'
        }),
    };

    function displayArray() {
        let answer_str = "";
        let start_i = 0;
        if (answer[0] === '-') {
            start_i = 1;
            answer_str += "-";
        }

        let cont = true;
        while (cont) {
            cont = false;
            answer_str += `[${answer[start_i]}`;
            start_i++;
            let i = start_i;
            while (true) {
                if (i >= answer.length) {
                    answer_str += "]";
                    break;
                }
                else if (answer[i] === '+' || answer[i] === '-') {
                    answer_str += `] ${answer[i]}`;
                    start_i = i + 1;
                    cont = true;
                    break;
                }
                else if (answer[i] === 'i') {
                    answer_str += `] i`;
                    break;
                }
                else {
                    answer_str += `, ${answer[i]}`;
                }
                i++;
            }
        }
        return answer_str;
    }

    function displaySeries() {
        let answer_str = "";
        for (let i = 0; i < answer.length; i++) {
            answer_str += (answer[i] === '+' || answer[i] === '-' || answer[i] === 'i'
                ? ` ${answer[i]} `
                : answer[i] < 10
                    ? answer[i]
                    : answer[i] < 36
                        ? String.fromCharCode(65 + answer[i] - 10)
                        : answer[i] < 62
                            ? String.fromCharCode(97 + answer[i] - 36)
                            : '#'
            );
        }
        return answer_str;
    }

    return (
        <>
            <Page pathList={['數學', '計算機', '進位制計算機']}>
                <h2>預轉換的十進位值</h2>
                <input type="number" value={inputValue1} onChange={(event) => { setInputValue1(event.target.value); }} />
                <span>+</span>
                <input type="number" value={inputValue2} onChange={(event) => { setInputValue2(event.target.value); }} />
                <span>i</span>
                <h2>進位制類型</h2>
                <Select className="select" styles={colourStyles} options={options} onChange={(item) => { setRadixType(item.value); setRadixValue1(''); setRadixValue2(''); }} />
                {/* <input style={{ display: radixType == 'N' ? '' : 'none' }} type="number" min={2} max={62} value={radixValue1} onChange={(event) => { if (event.target.value >= 2 && event.target.value <= 62) setRadixValue1(event.target.value); }} />
                <input style={{ display: radixType == 'Z' ? '' : 'none' }} type="number" min={-62} max={-2} value={radixValue1} onChange={(event) => { if (event.target.value <= -2 && event.target.value >= -62) setRadixValue1(event.target.value); }} />
                <input style={{ display: radixType == 'C' ? '' : 'none' }} type="number" value={radixValue1} onChange={(event) => { const sq_sum = event.target.value * event.target.value + radixValue2 * radixValue2; if (sq_sum <= 62 && sq_sum > 1) setRadixValue1(event.target.value); }} />
                <span style={{ display: radixType == 'C' ? '' : 'none' }}>+</span>
                <input style={{ display: radixType == 'C' ? '' : 'none' }} type="number" value={radixValue2} onChange={(event) => { const sq_sum = event.target.value * event.target.value + radixValue1 * radixValue1; if (sq_sum <= 62 && sq_sum > 1) setRadixValue2(event.target.value); }} />
                <span style={{ display: radixType == 'C' ? '' : 'none' }}>i</span> */}
                <input style={{ display: radixType == 'Z' ? '' : 'none' }} type="number" value={radixValue1} onChange={(event) => { setRadixValue1(event.target.value); }} />
                <input style={{ display: radixType == 'C' ? '' : 'none' }} type="number" value={radixValue1} onChange={(event) => { setRadixValue1(event.target.value); }} />
                <span style={{ display: radixType == 'C' ? '' : 'none' }}>+</span>
                <input style={{ display: radixType == 'C' ? '' : 'none' }} type="number" value={radixValue2} onChange={(event) => { setRadixValue2(event.target.value); }} />
                <span style={{ display: radixType == 'C' ? '' : 'none' }}>i</span>
                <br />
                <button
                    disabled={radixValue1 == '' || (radixType == 'C' && radixValue2 == '')}
                    onClick={() => {
                        try {
                            setAnswer(calculate(radixType, inputValue1, inputValue2, radixValue1, radixValue2));
                        } catch (error) {
                            setAnswer("無法計算");
                        }
                    }}
                >計算</button>
                <h2>轉換結果</h2>
                <p>{displaySeries()}</p>
                <p>{displayArray()}</p>
            </Page>
        </>
    );
}

export default RadixCalc;