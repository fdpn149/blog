import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import styles from "@/pages/Blog.module.scss"
import { useState } from "react";
import { calculate } from "@/utils/RadixCalc";
import RadixTypeSel from "@/components/Radix/RadixTypeSel";
import RadixBaseInput from "@/components/Radix/RadixBaseInput";
import RadixResultDisplay from "@/components/Radix/RadixResultDisplay";

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
        <Header />
        <main className={styles.main}>
            <section>
                <h3>進位制類型</h3>
                <RadixTypeSel setRadixType={setRadixType} />
                <RadixBaseInput radixType={radixType} radixBase={radixBase} setRadixBase={setRadixBase} />
                {/* <p>{radixBase["re"]}+{radixBase["im"]}i</p> */}
                <h3>預轉換的十進制數值</h3>
                <input type="number" value={decimal["re"]} onChange={(event) => { setDecimal((prev) => ({ ...prev, ["re"]: event.target.value })) }} />
                <span>+</span>
                <input type="number" value={decimal["im"]} onChange={(event) => { setDecimal((prev) => ({ ...prev, ["im"]: event.target.value })) }} />
                <span>i</span><br />
                <button onClick={handleButtonClicked}>轉換</button>
                <h3>轉換結果</h3>
                <RadixResultDisplay value={answer} />
            </section>
        </main>
        <Footer />
    </>
    );
}

export default Radix;