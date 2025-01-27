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
import QuaternionCalc from './pages/Math/Calculator/QuaternionCalc'
import IME_1 from './pages/Android/CreateApp/InputMethod/IME_1'
import TrinionCalc from './pages/Math/Calculator/TrinionCalc'
import RadixCalc from './pages/Math/Calculator/RadixCalc'

function App() {

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/*' element={
                        <Routes>
                            <Route path='/Android' element={<Android />} />
                            <Route path='/Android/*' element={
                                <Routes>
                                    <Route path='/App開發' element={<CreateApp />} />
                                    <Route path='/App開發/*' element={
                                        <Routes>
                                            <Route path='/主題顏色' element={<ThemeColor />} />
                                            <Route path='/客製化元件' element={<CustomComponent />} />
                                            <Route path='/資料單向綁定' element={<DataBinding />} />
                                            <Route path='/輸入法' element={<InputMethod />} />
                                            <Route path='/輸入法/*' element={
                                                <Routes>
                                                    <Route path='/前置作業' element={<IME_1 />} />
                                                </Routes>
                                            } />
                                            <Route path='*' element={<NotFound />} />
                                        </Routes>
                                    } />
                                    <Route path='*' element={<NotFound />} />
                                </Routes>
                            } />
                            <Route path='/數學' element={<Math />} />
                            <Route path='/數學/*' element={
                                <Routes>
                                    <Route path='/計算機' element={<Calculator />} />
                                    <Route path='/計算機/*' element={
                                        <Routes>
                                            <Route path='/四元數四則運算' element={<QuaternionCalc />} />
                                            <Route path='/波峰三元數' element={<TrinionCalc />} />
                                            <Route path='/進位制計算機' element={<RadixCalc />} />
                                            <Route path='*' element={<NotFound />} />
                                        </Routes>
                                    } />
                                    <Route path='*' element={<NotFound />} />
                                </Routes>
                            } />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    } />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App
