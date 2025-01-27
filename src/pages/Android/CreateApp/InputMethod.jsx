import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Card from '../../../components/Card';

function InputMethod() {
    const navigate = useNavigate();

    return (
        <>
            <Header pathList={['Android', 'App開發', '輸入法']} />
            <section>
                <div className='card-container'>
                    <Card handleClick={() => { navigate('/Android/App開發/輸入法/前置作業') }} imgSrc='https://cdn.pixabay.com/photo/2021/02/04/12/04/keyboard-5981126_960_720.jpg' title='前置作業' />
                </div>
            </section>
            <footer>

            </footer>
        </>
    );
}

export default InputMethod;