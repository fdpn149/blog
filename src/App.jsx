import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { DynamicRouter } from '@/components';

function App() {
  return <BrowserRouter basename='blog'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tutorials/AndroidApp開發/*' element={<DynamicRouter props={{ path: '/tutorials/AndroidApp開發' }} />} />
      <Route path='/tools/數學/*' element={<DynamicRouter props={{ path: '/tools/數學' }} />} />
      <Route path='/notes/*' element={<DynamicRouter props={{ path: '/notes' }} />} />
      <Route path='*' element={<DynamicRouter />} />
    </Routes>
  </BrowserRouter>
}

export default App
