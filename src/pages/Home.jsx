import Header from "@/components/header/Header";
import Card from "@/components/card/Card";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <main className="min-h-screen bg-theme-bg text-theme-text pt-20">
                <section className="container mx-auto px-4">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                        <Card handleClick={() => { navigate('/tutorials/Android') }} imgSrc='https://cdn.pixabay.com/photo/2019/02/06/14/42/android-3979307_960_720.jpg?attachment=' title='Android' />
                        <Card handleClick={() => { navigate('/tools/數學') }} imgSrc='https://cdn.pixabay.com/photo/2020/12/24/13/42/math-images-5857406_1280.jpg' title='數學' />
                        {/* <Card handleClick={() => { window.open('https://fdpn149.github.io/C-Tutorial-Website/', '_blank') }} imgSrc={c_tutorial_blog} title='C語言的冒險' /> */}
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Home;