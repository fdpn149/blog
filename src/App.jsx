import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import RouteTest from './pages/RouteTest'
import NotFound from './NotFound'
import Home from './pages/Home'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
