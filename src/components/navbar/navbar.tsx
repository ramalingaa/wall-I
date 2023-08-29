import "./navbar.css"
import logo from "../../imageDB/logo1.jpg"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
const Navbar = () => {
    
    const  navigate  = useNavigate()
    const redirectHomePage = () => {
        navigate("/")
    }
    return (
        <div className="navbar-wrapper">
            {/* <img src = {logo} alt = "company logo" className="logo-align"/> */}
            <div className="navbar-container">
                <div>
                    <h1 className="logo-design" onClick = {redirectHomePage}>MockMan</h1>

                </div>
                <div className="navbar-cta-container">
                    <Link to = "/">HOME</Link>
                    <Link to = "/about">ABOUT</Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar