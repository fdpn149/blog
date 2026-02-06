import styles from "@/pages/Blog.module.scss"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Image from "@/components/common/Image"
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
            <h2>客製化元件</h2>
            <section>
                <h3>建立元件layout</h3>
                <ul>
                    <li>於res/layout中，建立一個layout<br />
                        <Image path='/tutorials/Android/App開發/客製化元件/component_xml.png' alt="想要元件的layout" />
                        {/* <Image path='/notes/多媒體/6' style={{ 'maxHeight': '12rem' }} /> */}
                        {/* <img src={component_xml} alt="想要元件的layout" /> */}
                        <ul>
                            <li>這裡我取名為component_swipebutton.xml，並且使用FrameLayout(可以用其它種layout)</li>
                        </ul>
                    </li>
                    <li>更改layout的xml<br />
                        <p>從類似這樣</p>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<?xml version="1.0" encoding="utf-8"?>\n<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent">'}
                        </SyntaxHighlighter>
                        <p>改為這種型式</p>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<?xml version="1.0" encoding="utf-8"?>\n<merge xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:tools="http://schemas.android.com/tools"\n    tools:parentTag="android.widget.FrameLayout"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent">'}
                        </SyntaxHighlighter>
                        <ul>
                            <li>使用merge才不會讓元件之後在使用的時候多一個階層</li>
                            <li>將原本使用的layout種類放到tools:parentTag=的""裡面</li>
                        </ul>
                    </li>
                </ul>
                <h3>attr.xml</h3>
                <ul>
                    <li>在res/values中
                        <ul>
                            <li>若沒有需自行建立</li>
                        </ul>
                    </li>
                    <li>
                        <SyntaxHighlighter
                            language='xml'
                            style={theme === "dark" ? tomorrowNight : tomorrow}>
                            {'<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <declare-styleable name="SwipeButton">\n        <attr name="centerText" format="string" />\n        <attr name="startText" format="string" />\n        <attr name="topText" format="string" />\n        <attr name="endText" format="string" />\n        <attr name="bottomText" format="string" />\n    </declare-styleable>\n</resources>'}
                        </SyntaxHighlighter>
                        <ul>
                            <li>{'<declare-styleable name= 接待會建立的class(kt)之名稱'}</li>
                            <li>{'<attr name= 定義這個客製化元件要有什麼屬性 format= 它是什麼格式'}</li>
                        </ul>
                    </li>
                </ul>
                <h3>建立對應的kt</h3>
                <Image path='/tutorials/Android/App開發/客製化元件/kt.png' alt="SwipeButton.kt" />
                {/* <img src={kt} alt='SwipeButton.kt' /> */}
                <ul>
                    <li>名稱任意
                        <ul>
                            <li>這裡我取名為SwipeButton.kt</li>
                        </ul>
                    </li>
                    <li>繼承使用的layout種類
                        <ul>
                            <li>這裡會要求加入constructor，四種分別對應不同的情況，目前只需要用(Context, AttributeSet?) ，因此選擇它</li>
                        </ul>
                    </li>
                    <li>
                        實作constructor
                        <ul>
                            <li>
                                <SyntaxHighlighter
                                    language='kotlin'
                                    style={theme === "dark" ? tomorrowNight : tomorrow}>
                                    {'init {\n   val typedArray =\n      context.obtainStyledAttributes(attrs, R.styleable.SwipeButton, 0, 0)\n   inflate(context, R.layout.component_swipebutton, this)\n   (getChildAt(0) as MaterialButton).text = typedArray.getString(R.styleable.SwipeButton_centerText) ?: "center"\n   (getChildAt(1) as TextView).text = typedArray.getString(R.styleable.SwipeButton_startText) ?: "start"\n   (getChildAt(2) as TextView).text = typedArray.getString(R.styleable.SwipeButton_topText) ?: "top"\n   (getChildAt(3) as TextView).text = typedArray.getString(R.styleable.SwipeButton_endText) ?: "end"\n   (getChildAt(4) as TextView).text = typedArray.getString(R.styleable.SwipeButton_bottomText) ?: "bottom"\n}'}
                                </SyntaxHighlighter>
                                <ul>
                                    <li>context.obtainStyledAttributes(attrs,R.styleable.SwipeButton,0,0)
                                        <ul>
                                            <li>從attr.xml中取得有哪些屬性</li>
                                        </ul>
                                    </li>
                                    <li>inflate(context, R.layout.component_swipebutton, this)
                                        <ul>
                                            <li>設定這個class對應哪一個layout的xml</li>
                                        </ul>
                                    </li>
                                    <li>接下來設定顯示的值
                                        <ul>
                                            <li>getChildAt會從layout的xml找第幾個小孩</li>
                                            <li>typedArray.getString(R.styleable. 會從實際使用此客製化元件的地方指定的字串值當作顯示的值，若沒指定，則使用?: 後面的預設值</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </main>
        <Footer />
    </>
}

export default Page;