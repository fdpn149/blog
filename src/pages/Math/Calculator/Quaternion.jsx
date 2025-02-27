import Page from "../../Page";
import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";
import { useEffect } from "react";
import { calculate } from "../../../utils/QuaternionCalc";

function Quaternion() {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [answer, setAnswer] = useState(0);

    return (
        <>
            <Page pathList={['數學', '計算機', '四元數四則運算']}>
                <h2>算式</h2>
                <textarea value={inputValue} onChange={(event) => { setInputValue(event.target.value); }} />
                <button onClick={() => {
                    try {
                        setAnswer(calculate(inputValue));
                    } catch (error) {
                        setAnswer("無法計算");
                    }
                }}>計算</button><br />
                <h2>計算結果</h2>
                <p>{answer}</p>
            </Page>
        </>
    );
}

export default Quaternion;