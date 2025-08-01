import styles from "@/pages/blogs/Blog.module.scss"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useRef } from "react";
import { useEffect } from "react";

function Blog1() {
    const fram = useRef()

    useEffect(()=>{
        if(fram.current)
            fram.current.src = "/#/f2"
    },[])



    return <>
        <Header />
        <main>
            <h2>進位制轉換</h2>
            <section>
                <iframe ref={fram}/>
            </section>
        </main>
        <Footer />
    </>
}

export default Blog1;