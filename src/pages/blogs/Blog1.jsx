import "@/pages/blogs/Blog.scss"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Component from "@/utils/Component";

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

function Blog1() {
    return <>
        <Header />
        <main>
            <h2>進位制轉換</h2>
            <section>
                <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <Component props={{ path: "/blogs/frames/Frame2" }} />
                </div>
            </section>
        </main>
        <Footer />
    </>
}

export default Blog1;