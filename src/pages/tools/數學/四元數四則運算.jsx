import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import styles from "@/pages/Blog.module.scss"
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { calculate } from "@/utils/QuaternionCalc";

function Radix() {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [answer, setAnswer] = useState(0);

    return (
        <>
        <Header />
        <main className={styles.main}>
            <section>
                <h3>算式</h3>
                <textarea value={inputValue} onChange={(event) => { setInputValue(event.target.value); }} />
                <button onClick={() => {
                    try {
                        setAnswer(calculate(inputValue));
                    } catch (error) {
                        setAnswer("無法計算");
                    }
                }}>計算</button><br />
                <h3>計算結果</h3>
                <p>{answer}</p>
            </section>
        </main>
        <Footer />
    </>
    );
}

export default Radix;