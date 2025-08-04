import { Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Component from './utils/Component'

function App() {
  return <HashRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Component />} />
    </Routes>
  </HashRouter>
}

export default App
