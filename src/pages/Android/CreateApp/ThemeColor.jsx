import SyntaxHighlighter from "react-syntax-highlighter";
import {
    tomorrow,
    tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import Page from "../../Page";
import { useTheme } from "../../../hooks/useTheme";

function ThemeColor() {
    const theme = useTheme();

    return (
        <>
            <Page pathList={['Android', 'App開發', '主題顏色']}>
                <h1>主題顏色</h1>
                <h2>color.xml</h2>
                <ul>
                    <li>用來指定各種色彩名稱具體的顏色</li>
                    <li>於res/values中</li>
                    <li>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="black">#FF000000</color>\n    <color name="white">#FFFFFFFF</color>\n    <color name="green">#1B5E20</color>\n    <color name="green_dark">#003300</color>\n    <color name="green_light">#A5D6A7</color>\n    <color name="blue">#0288D1</color>\n    <color name="blue_dark">#005B9F</color>\n    <color name="blue_light">#81D4FA</color>\n</resources>'}
                        </SyntaxHighlighter>
                    </li>
                </ul>
                <h2>style.xml</h2>
                <ul>
                    <li>指定元件的顏色</li>
                    <li>於res/values中</li>
                    <li>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <style name="LightTextViewStyle">\n        <item name="android:textColor">@color/black</item>\n    </style>\n\n    <style name="DarkTextViewStyle">\n        <item name="android:textColor">@color/white</item>\n    </style>\n\n    <style name="ButtonStyle" parent="ShapeAppearanceOverlay.Material3.Button">\n        <item name="android:backgroundTint">?attr/colorPrimary</item>\n        <item name="android:textColor">?attr/colorOnPrimary</item>\n    </style>\n</resources>\n'}
                        </SyntaxHighlighter>
                    </li>
                </ul>
                <h2>themes.xml</h2>
                <ul>
                    <li>指定主要色、次要色等</li>
                    <li>在res/values中指定預設主題，res/values-night中指定夜間主題</li>
                    <li>用"?attr/"可以得到對應標籤的顏色</li>
                    <li>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<resources xmlns:tools="http://schemas.android.com/tools">\n    <style name="AppTheme" parent="Theme.Material3.DayNight">\n        <item name="colorPrimary">@color/green</item>\n        <item name="colorPrimaryVariant">@color/green_dark</item>\n        <item name="colorOnPrimary">@color/white</item>\n        <item name="colorSecondary">@color/blue</item>\n        <item name="colorSecondaryVariant">@color/blue_dark</item>\n        <item name="colorOnSecondary">@color/black</item>\n\n		<item name="android:textViewStyle">@style/LightTextViewStyle</item>\n        <item name="android:buttonStyle">@style/ButtonStyle</item>\n    </style>\n</resources>'}
                        </SyntaxHighlighter>
                    </li>
                    <li>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<resources xmlns:tools="http://schemas.android.com/tools">\n    <style name="AppTheme" parent="Theme.Material3.DayNight">\n        <item name="colorPrimary">@color/green_light</item>\n        <item name="colorPrimaryVariant">@color/green</item>\n        <item name="colorOnPrimary">@color/black</item>\n        <item name="colorSecondary">@color/blue_light</item>\n        <item name="colorSecondaryVariant">@color/blue_light</item>\n        <item name="colorOnSecondary">@color/black</item>\n\n        <item name="android:textViewStyle">@style/DarkTextViewStyle</item>\n        <item name="android:buttonStyle">@style/ButtonStyle</item>\n    </style>\n</resources>\n'}
                        </SyntaxHighlighter>
                    </li>
                    <li>
                        個別指定按鈕顏色<br />
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<Button\n    android:backgroundTint= "?attr/colorPrimary"\n    android:textColor="?attr/colorOnPrimary" />'}
                        </SyntaxHighlighter>
                    </li>
                </ul>
            </Page>
        </>
    );
}

export default ThemeColor;