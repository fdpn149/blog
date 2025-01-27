import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Card from '../../components/Card';

function Calculator() {
    const navigate = useNavigate();

    return (
        <>
            <Header pathList={['數學', '計算機']} />
            <section>
                <div className='card-container'>
                    <Card handleClick={() => { navigate('/數學/計算機/四元數四則運算') }} imgSrc='https://images.pexels.com/photos/6727759/pexels-photo-6727759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title='四元數四則運算' />
                    <Card handleClick={() => { navigate('/數學/計算機/進位制計算機') }} imgSrc='https://images.pexels.com/photos/6727759/pexels-photo-6727759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title='進位制計算機' />
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default Calculator;