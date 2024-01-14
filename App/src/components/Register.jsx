import React, { useState } from 'react'
import axios from 'axios'

function Register() {
    const [username  , setUsername ]  = useState("")
    const [password  , setPassword ]  = useState("")

    function onRegister ()
    {
        axios.post("http://localhost:5100/user/register" , {
            username , password
        }).then((res) => {
            console.log("response is  : " , res);
            alert(res.data.msg)

        }).catch((error) => {
            console.log("error is : " , error);
            alert(error.response.data.msg)
        })
    }
  return (
    <div>
        <input type="text" onChange={(e) => {
            setUsername(e.target.value)
        }} placeholder='Enter Usrename' name="" id="" />
        <input type="text" onChange={(e) => {
            setPassword(e.target.value)
        }} placeholder='Enter password' name="" id="" />
        {/* <input type="text" placeholder='Confirm Password' name="" id="" /> */}
            <button onClick={onRegister}>
                Register
            </button>
    </div>
  )
}

export default Register