import React, { useState } from "react";
import 'axios'
import axios from "axios";



function Login()
{   

    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')

    function onLogin()
    {   
        axios.post("http://localhost:5100/user/login" , {
            username  : username , 
            password : password
        }).then((res) => {
            console.log("Response is   : " , res.data);
            alert("Login Sucess")
            localStorage.setItem("token" , res.data.token)
        }).catch((error) => {
            alert("Invalid Credentials")
        } )
    }
    
    return (
        <>
            <h1>Login Component</h1>
            <input type="text " onChange={(e) => {
                setUsername(e.target.value)
            }} placeholder="Enter uername" name="" id="" />
            <input type="text " onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder="Enter password" name="" id="" />
            <button onClick={onLogin}> Login </button>
        </>
    )
}

export default Login