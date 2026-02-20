import { MainLayout, Card } from "@/components";
import { commonStyles } from "@/styles";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <MainLayout>
            <div className='card-container' style={commonStyles.cardGrid}>
                <Card
                    handleClick={() => { navigate('/tutorials/AndroidApp開發') }}
                    imgSrc='https://cdn.pixabay.com/photo/2019/02/06/14/42/android-3979307_960_720.jpg?attachment='
                    title='Android App 開發'
                    description="從零開始的 Android App 實戰教學，包含 Kotlin 基礎與 Jetpack Compose。"
                />
                <Card
                    handleClick={() => { navigate('/tools/數學') }}
                    imgSrc='https://cdn.pixabay.com/photo/2020/12/24/13/42/math-images-5857406_1280.jpg'
                    title='數學工具'
                    description="提供各種數學工具，包括複變函數繪圖計算機、複數四則運算等。"
                />
                <Card
                    handleClick={() => { navigate('/notes') }}
                    imgSrc='https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_1280.jpg'
                    title='學習筆記'
                    description="各類課程學習筆記，包含多媒體等相關內容統整。"
                />
            </div>
        </MainLayout>
    )
}

export default Home;