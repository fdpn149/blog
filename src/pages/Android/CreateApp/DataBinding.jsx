import SyntaxHighlighter from "react-syntax-highlighter";
import {
    tomorrow,
    tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import Page from "../../Page";
import { useTheme } from "../../../hooks/useTheme";

function DataBinding() {
    const theme = useTheme();

    return (
        <>
            <Page pathList={['Android', 'App開發', '資料單向綁定']}>
                <h1>資料單向綁定</h1>
                <h2>開啟功能</h2>
                <ul>
                    <li>需在build.gradle.kts (Module :app)中加入<br />
                        <SyntaxHighlighter
                            language='kotlin'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'buildFeatures {\n    compose = true\n    dataBinding = true\n}'}
                        </SyntaxHighlighter>

                    </li>
                </ul>
                <h2>建立要綁定的變數</h2>
                <ul>
                    <li>建立一個Kotlin Class
                        <SyntaxHighlighter
                            language='kotlin'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'class BindingVars(vararg closeables: Closeable?) : ViewModel(*closeables) {\n    val variable = ObservableField<Float>(20.0f)\n\n    fun setValue(value: Float) {\n        variable.set(value)\n    }\n}'}
                        </SyntaxHighlighter>
                        <ul>
                            <li>可指定初始值(20.0f)</li>
                            <li>需給一個設定值的function(setValue)，才可以對值做更改</li>
                        </ul>
                    </li>
                </ul>
                <h2>於layout中使用變數</h2>
                <ul>
                    <li>透過「Convert to data binding layout」將普通layout轉成data binding的layout</li>
                    <li>加入上面定義的class，名稱不一定要相同
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<data>\n    <variable\n        name="bindVars"\n        type="com.example.testime.BindingVars" />\n</data>'}
                        </SyntaxHighlighter>
                        <ul>
                            <li>{'之後可以以 "@{bindVars.variable}" 直接取得綁定變數 variable 的值'}</li>
                        </ul>
                    </li>
                </ul>
                <h2>修改變數值</h2>
                <ul>
                    <li>程式中可以先建立Binding物件和BindingVars物件，並設定好，就可以修改值
                        <SyntaxHighlighter
                            language='kotlin'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'val secondView: FrameLayout = findViewById(R.id.second)\nval binding: SecondBinding = DataBindingUtil.bind(secondView)!!\nval bindVars = BindVars()\nbinding.bindVars = bindVars\nbindVars.setValue(30.0f)'}
                        </SyntaxHighlighter>
                    </li>
                </ul>
            </Page>
        </>
    );
}

export default DataBinding;