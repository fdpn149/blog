import Header from "@/components/header/Header";
import Card from "@/components/card/Card";
import { useNavigate } from 'react-router-dom';

function Page() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='card-container'>
                       <Card handleClick={() => { navigate('/tutorials/Android/App開發') }} imgSrc='https://cdn.pixabay.com/photo/2023/07/15/23/25/android-8129781_1280.jpg' title='App開發' />
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Page;