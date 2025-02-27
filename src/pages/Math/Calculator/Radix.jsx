import Page from "../../Page";
import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { calculate } from "../../../utils/RadixCalc";
import { SingleValue, ValueContainer } from 'react-select/animated';
import RadixTypeSel from "../../../components/Radix/RadixTypeSel";
import RadixBaseInput from "../../../components/Radix/RadixBaseInput";
import RadixResultDisplay from "../../../components/Radix/RadixResultDisplay";

function Radix() {
    const [radixType, setRadixType] = useState('');
    const [radixBase, setRadixBase] = useState({ re: 0, im: 0 });
    const [decimal, setDecimal] = useState({ re: 0, im: 0 });
    const [answer, setAnswer] = useState({ re: { neg: '', int: '', dec: '' }, im: { neg: '', int: '', dec: '' } });

    function handleButtonClicked() {
        let ans = calculate(radixType, radixBase, decimal);
        setAnswer(ans);
    }

    return (
        <>
            <Page pathList={['數學', '計算機', '進位制計算機']}>
                <h2>進位制類型</h2>
                <RadixTypeSel setRadixType={setRadixType} />
                <RadixBaseInput radixType={radixType} radixBase={radixBase} setRadixBase={setRadixBase} />
                {/* <p>{radixBase["re"]}+{radixBase["im"]}i</p> */}
                <h2>預轉換的十進制數值</h2>
                <input type="number" value={decimal["re"]} onChange={(event) => { setDecimal((prev) => ({ ...prev, ["re"]: event.target.value })) }} />
                <span>+</span>
                <input type="number" value={decimal["im"]} onChange={(event) => { setDecimal((prev) => ({ ...prev, ["im"]: event.target.value })) }} />
                <span>i</span><br />
                <button onClick={handleButtonClicked}>轉換</button>
                <h2>轉換結果</h2>
                <RadixResultDisplay value={answer} />
            </Page>
        </>
    );
}

export default Radix;