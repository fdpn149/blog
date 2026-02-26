import styles from "./RadixTypeSel.module.scss";
import Select from "react-select";
import { useTheme } from "@/hooks/useTheme";

function RadixTypeSel({ setRadixType }) {
  const theme = useTheme();
  const options = [
    {
      label: "整數",
      options: [
        { value: "pos", label: "正數" },
        { value: "neg", label: "負數" },
      ],
    },
    {
      label: "特殊",
      options: [
        { value: "bal", label: "平衡" },
        { value: "bij", label: "雙射" },
      ],
    },
    {
      label: "複數",
      options: [
        { value: "ima", label: "虛數" },
        { value: "cpl", label: "複數" },
      ],
    },
    {
      label: "小數",
      options: [{ value: "dec", label: "小數" }],
    },
  ];

  const colourStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor:
        theme === "dark" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.9)",
      borderColor: state.isFocused
        ? "#3b82f6"
        : theme === "dark"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.2)" : "none",
      "&:hover": {
        borderColor: state.isFocused
          ? "#3b82f6"
          : theme === "dark"
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(0, 0, 0, 0.3)",
      },
      padding: "4px",
      fontFamily: "var(--code-font)",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1e2022" : "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
      border:
        theme === "dark"
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0,0,0,0.1)",
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      padding: "4px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
          ? theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.05)"
          : "transparent",
      color: state.isSelected
        ? "white"
        : theme === "dark"
          ? "#f3f4f6"
          : "#111827",
      cursor: "pointer",
      borderRadius: "4px",
      margin: "2px 0",
      fontFamily: "var(--code-font)",
      "&:active": {
        backgroundColor: state.isSelected
          ? "#2563eb"
          : theme === "dark"
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.1)",
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
      fontFamily: "var(--code-font)",
    }),
    groupHeading: (base) => ({
      ...base,
      color: theme === "dark" ? "#9ca3af" : "#6b7280",
      fontFamily: "var(--code-font)",
      fontWeight: "600",
    }),
  };

  return (
    <>
      <Select
        className={styles.select}
        styles={colourStyles}
        options={options}
        onChange={(item) => {
          setRadixType(item.value);
        }}
      />
    </>
  );
}

export default RadixTypeSel;
