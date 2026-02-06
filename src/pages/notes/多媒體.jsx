import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import styles from "@/pages/Blog.module.scss"
import Image from "@/utils/Image"

export default function Page() {
    return <>
        <Header />
        <main className={styles.main}>
            <h2>多媒體筆記</h2>
            <section>
                <details>
                    <summary><h3>類比影像→數位影像</h3></summary>
                    <ul>
                        <li>透過 Sampling(取樣) + Quantization(量化)</li>
                    </ul>
                    <details>
                        <summary><h3>Sampling</h3></summary>
                        <ul>
                            <li>將類比的資料以一定的(時間、像素)間隔進行取值，將資料離散化</li>
                            <li>平滑的圖案會變成一格一格的</li>
                        </ul>
                        <Image path='/notes/多媒體/1' style={{ 'maxWidth': 'min(100%, 20rem)' }} />
                    </details>
                    <details>
                        <summary><h3>Quantization</h3></summary>
                        <ul>
                            <li>將資料的數值映射到有限的範圍內</li>
                            <li>舉例
                                <ol>
                                    <li>現實中的顏色(接近∞種)對應成螢幕可以顯示的256×256×256=16,777,216種</li>
                                    <li>將彩色的影像(24 bytes)轉成灰階的(8 bytes)</li>
                                </ol>
                            </li>
                        </ul>
                        <Image path='/notes/多媒體/2' style={{ 'maxWidth': 'min(100%, 20rem)' }} />
                        <Image path='/notes/多媒體/3' style={{ 'maxWidth': 'min(100%, 20rem)' }} />
                    </details>
                </details>
                <details>
                    <summary><h3>眼睛的成像</h3></summary>
                    <ul>
                        <li>水晶體可以當作是鏡頭 成像在視網膜</li>
                        <li>眼睛有視錐與視桿兩種細胞</li>
                        <li>眼睛視網膜對顏色的敏感度：G:R:B=4:2:1
                            <br />
                            <Image path='/notes/多媒體/4' style={{ 'maxWidth': 'min(100%, 10rem)' }} />
                        </li>
                        <li>三種視錐細胞(receptors) 在不同的波長，會受到不同的刺激
                            <br />
                            <Image path='/notes/多媒體/5' style={{ 'maxWidth': 'min(100%, 20rem)' }} />
                            <ul>
                                <li>視錐細胞中，藍光對短波長比較敏感，紅光對長波長比較敏感</li>
                            </ul>
                        </li>
                        <li>眼睛會將看到的顏色 做類似積分的運算 而得到實際感受到的顏色</li>
                    </ul>
                </details>
                <details>
                    <summary><h3>色彩空間</h3></summary>
                    <ul>
                        <li>彩色影像由3個不唯一的bands組成</li>
                    </ul>
                    <Image path='/notes/多媒體/6' style={{ 'maxHeight': '12rem' }} />
                    <Image path='/notes/多媒體/7' style={{ 'maxHeight': '12rem' }} />
                    <details>
                        <summary><h3>RGB & CMYK</h3></summary>
                        <details>
                            <summary><h3>RGB</h3></summary>
                            <Image path='/notes/多媒體/8' style={{ 'maxWidth': 'min(100%, 15rem)' }} />
                            <Image path='/notes/多媒體/9' style={{ 'maxWidth': 'min(100%, 15rem)' }} />
                            <ul>
                                <li>顏色疊加(加色法、加法混色)→越來越亮
                                    <ul>
                                        <li><span style={{ color: '#ff0000' }}>R</span>+<span style={{ color: '#00ff00' }}>G</span>=<span style={{ color: '#ffff00' }}>Y</span></li>
                                        <li><span style={{ color: '#00ff00' }}>G</span>+<span style={{ color: '#0000ff' }}>B</span>=<span style={{ color: '#00ffff' }}>C</span></li>
                                        <li><span style={{ color: '#0000ff' }}>B</span>+<span style={{ color: '#ff0000' }}>R</span>=<span style={{ color: '#ff00ff' }}>M</span></li>
                                        <li><span style={{ color: '#ff0000' }}>R</span>+<span style={{ color: '#00ff00' }}>G</span>+<span style={{ color: '#0000ff' }}>B</span>=<span style={{ color: '#ffffff' }}>W</span></li>
                                    </ul>
                                </li>
                                <li>標準數位影像所使用的色彩空間</li>
                                <li>每個顏色有8-bits的intensity resolution
                                    <ul>
                                        <li>0~255</li>
                                        <li>非負整數</li>
                                        <li>離散的</li>
                                        <li>總共能產生出256×256×256=16,777,216種顏色`</li>
                                    </ul>
                                </li>
                            </ul>
                        </details>
                    </details>
                </details>
            </section>
        </main>
        <Footer />
    </>
}