import styles from "@/pages/Blog.module.scss"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
    tomorrow,
    tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "@/hooks/useTheme";

function Page() {
    const theme = useTheme();

    return <>
        <Header />
        <main className={styles.main}>
            <h2>前置作業</h2>
            <section>
                <h3>建立專案</h3>
                <ul>
                    <li>在建立專案的視窗中，選擇「No Activity」</li>
                    <li>名稱、package名、儲存路徑可自行定義，其它照預設即可</li>
                </ul>
                <h3>基本設定</h3>
                <h3>AndroidManifest.xml</h3>
                <ul>
                    <li>在app/manifests底下</li>
                    <li>新增activity與service
                        <ul>
                            <li>{"先將application尾巴的「/>」改成「>」並且換行之後添加「</application>」"}</li>
                            <li>將以下內容夾在application的標籤中<br />
                                <SyntaxHighlighter
                                    language='xml'
                                    style={theme === "dark" ? tomorrowNight : tomorrow}>
                                    {'<activity\n    android:name=".MainActivity"\n    android:exported="true">\n    <intent-filter>\n        <action android:name="android.intent.action.MAIN" />\n        <category android:name="android.intent.category.LAUNCHER" />\n    </intent-filter>\n</activity>\n\n<service\n    android:name="InputMethod"\n    android:label="@string/app_name"\n    android:permission="android.permission.BIND_INPUT_METHOD"\n    android:exported="true">\n    <intent-filter>\n        <action android:name="android.view.InputMethod" />\n    </intent-filter>\n    <meta-data\n        android:name="android.view.im"\n        android:resource="@xml/method" />\n</service>'}
                                </SyntaxHighlighter>
                                <ul>
                                    <li>這裡指定了預設的「activity」(雖然不一定用得到，但不指定會無法執行)</li>
                                    <li>這裡還註冊了輸入法的服務，因此可以去手機的設定→語言與鍵盤找到我們做的輸入法並啟用</li>
                                    <li>「.MainActivity」、「InputMethod」、「@xml/method」還沒定義，所以會被畫線</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3>MainActivity.kt</h3>
                <ul>
                    <li>新增此Kotlin Class於kotlin+java的com.xxx.xxxxxx(package名稱)中</li>
                    <li>在class的名稱後面繼承android.app的「Activity」
                        <SyntaxHighlighter
                            language='kotlin'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'class MainActivity : Activity()'}
                        </SyntaxHighlighter>
                        <ul>
                            <li>跳出需要import東西直接給它import下去就可以了</li>
                            <li>class裡面的內容可以自行實作，不過留空也可以</li>
                            <li>主要實作輸入法的部分是InputMethod.kt，不是這裡</li>
                        </ul>
                    </li>
                </ul>
                <h3>method.xml</h3>
                <ul>
                    <li>在app/res/xml中新增此檔案</li>
                    <li>填入以下內容
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<?xml version="1.0" encoding="utf-8"?>\n<input-method xmlns:android="http://schemas.android.com/apk/res/android">\n    <subtype\n        android:imeSubtypeLocale="zh_TW"\n        android:imeSubtypeMode="keyboard"\n        android:isAsciiCapable="true"\n        android:label="@string/subtype" />\n</input-method>'}
                        </SyntaxHighlighter>
                        <ul>
                            <li>@string/subtype應該會畫紅色的，<br />
                                只要右鍵它點「Show Context Actions」並點「Create string value resource 'subtype'」，<br />
                                接著在「Resource value」中輸入輸入法的「顯示名稱」(不用與先前定義的一樣，可以是中文)，<br />
                                就可按「OK」結束</li>
                        </ul>
                    </li>
                </ul>
                <h3>InputMethod.kt</h3>
                <ul>
                    <li>在與MainActivity相同的位置建立一個Kotlin的class</li>
                    <li>名稱不一定要叫InputMethod.kt，只要與AndroidManifest.xml內寫得一樣就可以</li>
                    <li>這個class需繼承android.inputmethodservice的「InputMethodService」</li>
                </ul>
                <h3>結語</h3>
                <ul>
                    <li>上述過程若順利，完成後利用USB偵錯或無線偵錯，將App安裝到手機，應該就會開啟一個空白的程式(MainActivity)</li>
                    <li>到手機設定中語言與鍵盤底下，在輸入法的地方應該就能找到我們剛建立的輸入法，可以將它打開，不過目前還沒有功能</li>
                </ul>
            </section>
        </main>
        <Footer />
    </>
}

export default Page;