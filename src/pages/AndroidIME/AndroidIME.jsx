import './AndroidIME.css'
import Header from '../../components/Header';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';

function AndroidIME() {
    const navigate = useNavigate();

    return (
        <>
            <Header pathList={['Android輸入法開發']} />
            <section>
                <div className='card-container'>
                    <Card handleClick={() => { navigate('/Android輸入法開發/主題顏色') }} imgSrc='https://images.pexels.com/photos/18509543/pexels-photo-18509543.jpeg?cs=srgb&dl=pexels-jakubzerdzicki-18509543.jpg&fm=jpg' title='主題顏色' />
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default AndroidIME;