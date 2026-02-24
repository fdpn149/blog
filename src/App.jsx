import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DynamicRouter } from '@/components';

function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path='/' element={<DynamicRouter props={{ component: 'default', path: '/Home' }} />} />
      <Route path='/tutorials/AndroidApp開發/*' element={<DynamicRouter props={{ path: '/tutorials/AndroidApp開發' }} />} />
      <Route path='/tools/數學/*' element={<DynamicRouter props={{ path: '/tools/數學' }} />} />
      <Route path='/notes/*' element={<DynamicRouter props={{ path: '/notes' }} />} />
      <Route path='*' element={<DynamicRouter />} />
    </Routes>
  </BrowserRouter>
}

export default App
