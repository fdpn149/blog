import styles from "./MathTools.module.scss"
import { useState } from "react";
import { calculate } from "@/utils/RadixCalc";
import { RadixTypeSel, RadixBaseInput, RadixResultDisplay } from "@/components";

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
        <section className={styles.mathSection}>
            <h3>進位制類型</h3>
            <RadixTypeSel setRadixType={setRadixType} />
            <RadixBaseInput radixType={radixType} radixBase={radixBase} setRadixBase={setRadixBase} />
            <h3>預轉換的十進制數值</h3>
            <div className={styles.inputGroup}>
                <input className={styles.input} type="number" value={decimal["re"]} onChange={(event) => { setDecimal((prev) => ({ ...prev, ["re"]: event.target.value })) }} />
                <span>+</span>
                <input className={styles.input} type="number" value={decimal["im"]} onChange={(event) => { setDecimal((prev) => ({ ...prev, ["im"]: event.target.value })) }} />
                <span>i</span>
            </div>
            <button className={styles.button} onClick={handleButtonClicked}>轉換</button>
            <h3>轉換結果</h3>
            <div className={styles.resultBox}>
                <RadixResultDisplay value={answer} />
            </div>
        </section>
    );
}

export default Radix;