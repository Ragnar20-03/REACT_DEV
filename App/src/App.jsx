import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Login from './components/login'
import Register from './components/Register'
import 'react-router-dom'
import { Link, Route, Router, Routes } from 'react-router-dom'
import Course from './components/Course'
import Nav from './components/Nav'

function App() {

  return (
    <>
    <h1>Inisde App</h1>
      <Nav />
      <Routes >
      <Route path='/' element={<Course />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      </Routes>

    </>
  )
}

export default App
