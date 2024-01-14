import { Link, NavLink } from "react-router-dom"
import './Nav.css'

function Nav() {
  return (
    <nav className="bg-black text-white flex justify-center space-x-4 m-3 p-3 border-1 rounded-xl"> 

      <NavLink className={"text-white bg-blue-600 hover:bg-blue-800 p-2 m-2 border-1 rounded-md  "} to={"/"}>Home</NavLink>
      <NavLink className={"text-white bg-blue-600 hover:bg-blue-800 p-2 m-2 border-1 rounded-md  "}   to={"/course"}>Courses</NavLink>
      <NavLink className={"text-white bg-blue-600 hover:bg-blue-800 p-2 m-2 border-1 rounded-md  "}   to={"/purchase"}>Purchase</NavLink>
      <NavLink className={"text-white bg-blue-600 hover:bg-blue-800 p-2 m-2 border-1 rounded-md  "}  to={"/register"}>Register</NavLink>
      <NavLink className={"text-white bg-blue-600 hover:bg-blue-800 p-2 m-2 border-1 rounded-md  "}   to={"/login"}>Login</NavLink>
      <NavLink className={"text-white bg-blue-600 hover:bg-blue-800 p-2 m-2 border-1 rounded-md  "}   to={"/login"}>Account</NavLink>
      </nav>
  )
}

export default Nav