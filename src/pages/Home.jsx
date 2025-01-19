import './Home.css'
import Card from '../components/Card';
import Header from '../components/Header';
import c_tutorial_blog from '../assets/C_tutorial_blog.png'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Header pathList={[]} />
            <section>
                <div className='card-container'>
                    <Card handleClick={() => { window.open('https://fdpn149.github.io/C-Tutorial-Website/', '_blank') }} imgSrc={c_tutorial_blog} title='C語言的冒險' />
                    <Card handleClick={() => { navigate('/Android輸入法開發') }} imgSrc='https://cdn.pixabay.com/photo/2023/07/15/23/25/android-8129781_1280.jpg' title='Android輸入法開發' />
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default Home;