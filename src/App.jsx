import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RouteTest from './pages/RouteTest'
import NotFound from './NotFound'
import Home from './pages/Home'
import Android from './pages/Android'
import CreateApp from './pages/Android/CreateApp'
import InputMethod from './pages/Android/CreateApp/InputMethod'
import ThemeColor from './pages/Android/CreateApp/ThemeColor'
import CustomComponent from './pages/Android/CreateApp/CustomComponent'
import DataBinding from './pages/Android/CreateApp/DataBinding'
import Math from './pages/Math'
import Calculator from './pages/Math/Calculator'
import Quaternion from './pages/Math/Calculator/Quaternion'
import IME_1 from './pages/Android/CreateApp/InputMethod/IME_1'
import Radix from './pages/Math/Calculator/Radix'

function App() {

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Android 相關路由 */}
                    <Route path="/Android" element={<Android />} />
                    <Route path="/Android/App開發" element={<CreateApp />} />
                    <Route path="/Android/App開發/主題顏色" element={<ThemeColor />} />
                    <Route path="/Android/App開發/客製化元件" element={<CustomComponent />} />
                    <Route path="/Android/App開發/資料單向綁定" element={<DataBinding />} />
                    <Route path="/Android/App開發/輸入法" element={<InputMethod />} />
                    <Route path="/Android/App開發/輸入法/前置作業" element={<IME_1 />} />

                    {/* 數學相關路由 */}
                    <Route path="/數學" element={<Math />} />
                    <Route path="/數學/計算機" element={<Calculator />} />
                    <Route path="/數學/計算機/四元數四則運算" element={<Quaternion />} />
                    <Route path="/數學/計算機/進位制計算機" element={<Radix />} />

                    {/* 所有未匹配路由導向 NotFound */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App
