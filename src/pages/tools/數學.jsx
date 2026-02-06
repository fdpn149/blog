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
                        <Card handleClick={() => { navigate('/tools/數學/複變函數繪圖計算機') }} imgSrc='https://cdn.pixabay.com/photo/2016/01/27/01/20/calculator-1163491_960_720.jpg' title='複變函數繪圖計算機' />
                        <Card handleClick={() => { navigate('/tools/數學/進制轉換器') }} imgSrc='https://images.pexels.com/photos/6727759/pexels-photo-6727759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title='進制轉換器' />
                        <Card handleClick={() => { navigate('/tools/數學/四元數四則運算') }} imgSrc='https://images.pexels.com/photos/6727759/pexels-photo-6727759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' title='四元數四則運算' />
                    </div>
                </section>
            </main>
            <footer></footer>
        </>
    )
}

export default Page;