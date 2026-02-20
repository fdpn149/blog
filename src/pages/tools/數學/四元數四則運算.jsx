import styles from "./MathTools.module.scss"
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { calculate } from "@/utils/QuaternionCalc";

function Radix() {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [answer, setAnswer] = useState(0);

    return (
        <section className={styles.mathSection}>
            <h3>算式</h3>
            <textarea className={styles.textarea} value={inputValue} onChange={(event) => { setInputValue(event.target.value); }} />
            <br /><br />
            <button className={styles.button} onClick={() => {
                try {
                    setAnswer(calculate(inputValue));
                } catch (error) {
                    setAnswer("無法計算");
                }
            }}>計算</button>
            <h3>計算結果</h3>
            <div className={styles.resultBox}>
                <p>{answer}</p>
            </div>
        </section>
    );
}

export default Radix;