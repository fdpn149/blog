import Header from '../components/Header';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

function Android() {
    const navigate = useNavigate();

    return (
        <>
            <Header pathList={['Android']} />
            <section>
                <div className='card-container'>
                    <Card handleClick={() => { navigate('/Android/App開發') }} imgSrc='https://cdn.pixabay.com/photo/2023/07/15/23/25/android-8129781_1280.jpg' title='App開發' />
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default Android;