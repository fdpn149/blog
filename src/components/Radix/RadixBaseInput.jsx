import { useState } from "react";
import styles from "./RadixTypeSel.module.scss"
import mathStyles from "../../pages/tools/數學/MathTools.module.scss"

function RadixBaseInput({ radixType, radixBase, setRadixBase }) {

    let display = []

    switch (radixType) {
        case "pos":
            display = [<input className={mathStyles.input} key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "neg":
            display = [<input className={mathStyles.input} key={1} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "bal":
            display = [<input className={mathStyles.input} key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "bij":
            display = [<input className={mathStyles.input} key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "dec":
            display = [<input className={mathStyles.input} key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "ima":
            display = [<input className={mathStyles.input} key={0} type="number" value={radixBase["im"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: 0, ["im"]: event.target.value })) }} />, <span key={1}>i</span>]
            break;
        case "cpl":
            display = [<input className={mathStyles.input} key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />,
            <span key={1}>+</span>,
            <input className={mathStyles.input} key={2} type="number" value={radixBase["im"]} onChange={(event) => { setRadixBase((prev) => ({ ...prev, ["im"]: event.target.value })) }} />,
            <span key={3}>i</span>]
            break;
        default:
            display = []
            break;
    }

    return (
        <div className={styles.radixInputGroup}>
            {display}
        </div>
    );
}

export default RadixBaseInput;