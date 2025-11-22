import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Component from './utils/Component'

function App() {
  return <BrowserRouter basename='blog'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Component />} />
    </Routes>
  </BrowserRouter>
}

export default App
