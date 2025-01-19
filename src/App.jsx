import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RouteTest from './pages/RouteTest'
import NotFound from './NotFound'
import Home from './pages/Home'
import AndroidIME from './pages/AndroidIME/AndroidIME'
import ThemeColor from './pages/AndroidIME/ThemeColor'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Android輸入法開發' element={<AndroidIME />} />
          <Route path='/Android輸入法開發/主題顏色' element={<ThemeColor />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
