import styles from "./RadixTypeSel.module.scss"

function RadixBaseInput({ radixType, radixBase, setRadixBase }) {

    let display = []

    switch (radixType) {
        case "pos":
            display = [<input key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "neg":
            display = [<input key={1} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "bal":
            display = [<input key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "bij":
            display = [<input key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "dec":
            display = [<input key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />]
            break;
        case "ima":
            display = [<input key={0} type="number" value={radixBase["im"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: 0, ["im"]: event.target.value })) }} />, <span key={1}>i</span>]
            break;
        case "cpl":
            display = [<input key={0} type="number" value={radixBase["re"]} onChange={(event) => { setRadixBase((prev) => ({ ["re"]: event.target.value, ["im"]: 0 })) }} />,
            <span key={1}>+</span>,
            <input key={2} type="number" value={radixBase["im"]} onChange={(event) => { setRadixBase((prev) => ({ ...prev, ["im"]: event.target.value })) }} />,
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