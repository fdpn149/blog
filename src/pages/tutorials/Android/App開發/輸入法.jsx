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
                        <Card handleClick={() => { navigate('/tutorials/Android/App開發/輸入法/前置作業') }} imgSrc='https://cdn.pixabay.com/photo/2021/02/04/12/04/keyboard-5981126_960_720.jpg' title='前置作業' />
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Page;