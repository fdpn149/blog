import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DynamicRouter from '@/components/router/DynamicRouter'

function App() {
  return <BrowserRouter basename='blog'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<DynamicRouter />} />
    </Routes>
  </BrowserRouter>
}

export default App
