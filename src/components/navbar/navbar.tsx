import "./navbar.css"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import {  useAuthenticator } from '@aws-amplify/ui-react';
import ProfileCard from "./profile";
import { useLocation } from 'react-router-dom';
import Logo from "../../imageDB/Handshake old.jpg"
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
                <div className = "logo-container">
                    <h2 className="logo-design" onClick = {redirectHomePage}>MockMan</h2>

                </div>
                <div className="navbar-cta-container">
                    <Link to = "/">HOME</Link>
                    <Link to = "/about">ABOUT</Link>
                    {route === "authenticated" ?  <ProfileCard /> :  (location.pathname === "/login" ?"" :<button className = "btn primary" onClick = {loginRedirectHandler}>Login</button>)}
                </div>
            </div>
        </div>
    )
}
export default Navbar