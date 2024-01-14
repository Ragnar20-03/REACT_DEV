import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Course from './components/Course'
import Purchase from './components/Purchase'
import Register from './components/Register'
import Login from './components/Login'
import Nav from './components/Nav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Nav />
    
    <Routes >
    <Route path='/' element={<Course />} />
    <Route path='/course' element={<Course />} />
    <Route path='/purchase' element={<Purchase />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    </Routes>

    
    </>
  )
}

export default App
