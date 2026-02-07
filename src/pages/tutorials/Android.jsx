import Header from "@/components/header/Header";
import Card from "@/components/card/Card";
import { useNavigate } from 'react-router-dom';

function Page() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <main className="min-h-screen bg-theme-bg text-theme-text pt-20">
                <section className="container mx-auto px-4">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                        <Card handleClick={() => { navigate('/tutorials/Android/App開發') }} imgSrc='https://cdn.pixabay.com/photo/2023/07/15/23/25/android-8129781_1280.jpg' title='App開發' />
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Page;