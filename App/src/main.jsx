import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.interceptors.request.use( function (config) {
    console.log("From My InterCeptors : " , config);
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}` 
    return config
} , function (error){
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response.data
} , (error) => {
    return Promise.reject(error)
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter >
    <App />
    </BrowserRouter>
)
