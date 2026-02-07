import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DynamicRouter from '@/components/router/DynamicRouter'

function App() {
  return <BrowserRouter basename='blog'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tutorials/Android/App開發/*' element={<DynamicRouter props={{ component: 'default', path: '/tutorials/Android/App開發' }} />} />
      <Route path='/tutorials/Android/進階開發/*' element={<DynamicRouter props={{ component: 'default', path: '/tutorials/Android/App開發' }} />} />
      <Route path='*' element={<DynamicRouter />} />
    </Routes>
  </BrowserRouter>
}

export default App
