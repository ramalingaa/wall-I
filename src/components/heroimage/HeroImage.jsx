import { redirect } from "react-router"
import "./heroimage.css"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const HeroImage = () => {

        const navigate = useNavigate();
        const { jwtToken } = useAppSelector((state) => state)
        const authHandler = () => {
                navigate("auth")     
        }
        const learnMoreHandler = () => {
                navigate("about")
        }
    return (
    
           <div className = "hero-text-parent">
            <div>
                    <p className = "hero-text">Revolutionize Your Interview Game.</p>
            </div>
            <div className = "hero-text-btn-container">
                    <button className = "btn" onClick = {authHandler} id = "get-started-btn">Get Started</button>
                    <button className = "btn btn-secondary" id = "learn-more" onClick={learnMoreHandler}>Learn More</button>
            </div>
           </div>
           
    
    )
}
export default HeroImage