import styles from "./RadixTypeSel.module.scss"
import Select from "react-select";
import { useTheme } from "@/hooks/useTheme";

function RadixTypeSel({ setRadixType }) {
    const theme = useTheme();
    const options = [
        {
            label: "整數",
            options: [
                { value: "pos", label: "正數" },
                { value: "neg", label: "負數" }
            ]
        },
        {
            label: "特殊",
            options: [
                { value: "bal", label: "平衡" },
                { value: "bij", label: "雙射" }
            ]
        },
        {
            label: "複數",
            options: [
                { value: "ima", label: "虛數" },
                { value: "cpl", label: "複數" },
            ]
        },
        {
            label: "小數",
            options: [
                { value: "dec", label: "小數" },
            ]
        }
    ]

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

    return (
        <>
            <Select className={styles.select} styles={colourStyles} options={options} onChange={(item) => { setRadixType(item.value); }} />
        </>
    );
}

export default RadixTypeSel;