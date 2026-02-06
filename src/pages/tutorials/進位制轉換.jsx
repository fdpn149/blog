import styles from "@/pages/Blog.module.scss"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import DynamicRouter from "@/components/router/DynamicRouter"

export function Frame1() {
    return <details>
        <summary><h3>進制的概念</h3></summary>
        <ul>
            <li>當我們從0開始，一次增加一個白色積木，當白色積木到達十顆的時候，就換成一個橘色積木</li>
            <li>當我們從0開始，一次增加一個橘色積木，當橘色積木到達十顆的時候，就換成一個百格板</li>
        </ul>
        <p>這種逢十進位的規則，就稱為十進制</p>
    </details>
}

export function Frame2() {
    return <details>
        <summary><h3>什麼是十進制</h3></summary>
        <p>不知道大家國小數學課時，有沒有玩過這種由積木和百格板所組成的數學教材</p>
        <img src="https://img.yamol.tw/file/5e9d427f0096c.jpg#s-504,248" />
        <p>這個其實就是十進位非常好的例子</p>
        <p>對於一個〇到一千內的整數，我們可以使用</p>
        <ul>
            <li>0~9個白色積木組合出個位數</li>
            <li>0~9個橘色積木組合出十位數</li>
            <li>0~9個百格板組合出百位數</li>
        </ul>
        <p>舉例來說如以下圖片</p>
        <div className={styles.dualBox}>
            <img src="https://img.youtube.com/vi/CdZfDwIoiVo/0.jpg" style={{ objectFit: 'cover', objectPosition: 'top', aspectRatio: '1.6' }} />
            <img src="https://img.youtube.com/vi/REifITjP9fI/0.jpg" style={{ objectFit: 'cover', objectPosition: 'top', aspectRatio: '1.6' }} />
        </div>
        <p>我們可以輕易地用這些積木就能組合出0~999的整數，並且立方體的總數就等同實際的數值</p>
        <div>
            <Component props={{ path: '/tutorials/進位制轉換', component: 'Frame1' }} />
        </div>
    </details>
}

function Blog1() {
    return <>
        <Header />
        <main className={styles.main}>
            <h2>進位制轉換</h2>
            <section>
                <Component props={{ path: '/tutorials/進位制轉換', component: 'Frame2' }} />
            </section>
        </main>
        <Footer />
    </>
}

export default Blog1;