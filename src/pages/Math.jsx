import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

function Math() {
    const navigate = useNavigate();

    return (
        <>
            <Header pathList={['數學']} />
            <section>
                <div className='card-container'>
                    <Card handleClick={() => { navigate('/數學/計算機') }} imgSrc='https://cdn.pixabay.com/photo/2016/01/27/01/20/calculator-1163491_960_720.jpg' title='計算機' />
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default Math;