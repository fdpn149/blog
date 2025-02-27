import { Fragment } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'react-katex/dist/katex.min.css';

function RadixResultDisplay({ value }) {
    if (value["re"]["neg"] === '')
        return (<></>);
    const display_value = [];
    const display_array = [];
    switch (getSign(value["re"])) {
        case 1:
        case -1: {
            display_value.push(value["re"]["neg"] ? '-' : '');
            display_array.push(value["re"]["neg"] ? '-' : '');
            displayValue(value["re"]);
            displayArray(value["re"]);

            switch (getSign(value["im"])) {
                case 1:
                case -1: {
                    display_value.push(value["im"]["neg"] ? '-' : '+');
                    display_array.push(<br key={"im"} />, value["im"]["neg"] ? '-' : '+',<br key={"+-"} />);
                    displayValue(value["im"]);
                    displayArray(value["im"]);
                    display_value.push(" i");
                    display_array.push(<br key={"i"} />," i");
                    break;
                }
            }
            break;
        }
        case 0: {
            switch (getSign(value["im"])) {
                case 1:
                case -1: {
                    display_value.push(value["im"]["neg"] ? '-' : '');
                    display_array.push(value["im"]["neg"] ? '-' : '');
                    displayValue(value["im"]);
                    displayArray(value["im"]);
                    display_value.push(" i");
                    display_array.push(<br key={"i"} />," i");
                    break;
                }
                case 0: {
                    display_value.push(0);
                    display_array.push(0);
                    break;
                }
            }
            break;
        }
    }



    function getSign(value) {
        if (value["int"].length === 1 && value["int"][0] == 0 && value["dec"].length === 1 && value["dec"][0] == 0)
            return 0;
        return value["neg"] ? -1 : 1;
    }

    function displayValue(value) {
        let result = "";
        let i = value["int"].length - 1;
        for (i = i; i >= 0; i--) {
            result += getValue(value["int"][i]);
        }
        if (!isZero(value["dec"])) {
            result += '.';
            for (i = 0; i < value["dec"].length; i++) {
                result += getValue(value["dec"][i]);
            }
        }
        display_value.push(<div className='math' key={display_value.length}><InlineMath math={result} className="math" /></div>);
    }

    function displayArray(value) {
        display_array.push('[');
        let i = value["int"].length - 1;
        display_array.push(value["int"][i]);
        for (i = i - 1; i >= 0; i--) {
            display_array.push(',');
            display_array.push(value["int"][i]);
        }
        display_array.push(']');
        if (isZero(value["dec"])) return;
        display_array.push('.[');
        i = 0;
        display_array.push(value["dec"][i]);
        for (i = 1; i < value["dec"].length; i++) {
            display_array.push(',');
            display_array.push(value["dec"][i]);
        }
        display_array.push(']');
    }

    function isZero(arr) {
        if (arr.length === 1 && arr[0] == 0)
            return true;
        return false;
    }

    function getValue(num) {
        if (num < 0)
            return `\\overline{${getValue(-num)}}`;
        if (num <= 9)
            return String(num);
        if (num - 9 <= 26)
            return String.fromCharCode(65 + num - 10);
        if (num - 35 <= 26)
            return String.fromCharCode(97 + num - 36);
        return '#';
    }

    return (
        <>
            <h3>數值表示：</h3><br />
            {display_value}<br />
            <h3>陣列表示：</h3><br />
            {display_array}
        </>
    );
}


export default RadixResultDisplay;