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
                        <Card handleClick={() => { navigate('/tutorials/Android/App開發/主題顏色') }} imgSrc='https://images.pexels.com/photos/18509543/pexels-photo-18509543.jpeg?cs=srgb&dl=pexels-jakubzerdzicki-18509543.jpg&fm=jpg' title='主題顏色' />
                        <Card handleClick={() => { navigate('/tutorials/Android/App開發/客製化元件') }} imgSrc='https://cdn.pixabay.com/photo/2021/05/04/16/10/user-interface-6229126_640.jpg' title='客製化元件' />
                        <Card handleClick={() => { navigate('/tutorials/Android/App開發/資料單向綁定') }} imgSrc='https://cdn.pixabay.com/photo/2017/06/25/13/45/colors-2440860_1280.jpg' title='資料單向綁定' />
                        <Card handleClick={() => { navigate('/tutorials/Android/App開發/輸入法') }} imgSrc='https://cdn.pixabay.com/photo/2021/02/04/12/04/keyboard-5981126_960_720.jpg' title='輸入法' />
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Page;