import { HashRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import Home from '@/pages/Home/Home'
import Blog1 from './pages/blogs/Blog1'
import Blog2 from './pages/blogs/Blog2'
import Frame1 from './pages/blogs/frames/Frame1'
import Frame2 from './pages/blogs/frames/Frame2'

function App() {
  return <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/1' element={<Blog1 />} />
        <Route path='/2' element={<Blog2 />} />
        <Route path='/f1' element={<Frame1 />} />
        <Route path='/f2' element={<Frame2 />} />
      </Routes>
    </Suspense>
  </HashRouter>
}

export default App
