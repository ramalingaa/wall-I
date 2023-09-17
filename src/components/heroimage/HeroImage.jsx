import "./heroimage.css"
import { useNavigate } from 'react-router-dom';
import {  useAppSelector } from "../../hooks/redux";
const HeroImage = () => {

        const navigate = useNavigate();
        const { jwtToken } = useAppSelector((state) => state)
        const authHandler = () => {
                navigate("select-level")     
        }
        const learnMoreHandler = () => {
                navigate("about")
        }
    return (
    
           <div className = "hero-text-parent">
             <div className='about-hero-container'>
                <h1>Revolutionize your mock interviews.</h1>
            </div>
            <div className = "hero-text-btn-container">
                    <button className = "btn" onClick = {authHandler} id = "get-started-btn">Get Started</button>
                    <button className = "btn btn-secondary" id = "learn-more" onClick={learnMoreHandler}>Learn More</button>
            </div>
           </div>
           
    
    )
}
export default HeroImage