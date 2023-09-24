import "./navbar.css"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import {  useAuthenticator } from '@aws-amplify/ui-react';
import ProfileCard from "./profile";
import { useLocation } from 'react-router-dom';
import Logo from "../../imageDB/MockMan-logos-blue.jpeg"
const Navbar = () => {
    const { route, user, authStatus  } = useAuthenticator((context) => [context.route, context.user, context.authStatus ]);
    const  navigate  = useNavigate()
    const location = useLocation();
    const redirectHomePage = () => {
        navigate("/")
    }
    const loginRedirectHandler = () => {
        navigate("/login")
    }
    return (
        <div className="navbar-wrapper">
            <div className="navbar-container">
                <div className = "logo-container cursor-pointer" onClick = {redirectHomePage}>
                    { !Logo ? <h2 className="logo-design" onClick = {redirectHomePage}>MockMan</h2> 
                    : <img src = {Logo} alt = "product" className = "logo-align"/>}
                </div>
                <div className="navbar-cta-container">
                    <Link to = "/">Services</Link>
                    <Link to = "/about">About</Link>
                    <Link to = "/about">Contact</Link>
                    {route === "authenticated" ?  <ProfileCard /> :  (location.pathname === "/login" ?"" :<button className = "btn primary" onClick = {loginRedirectHandler}>Login</button>)}
                </div>
            </div>
        </div>
    )
}
export default Navbar