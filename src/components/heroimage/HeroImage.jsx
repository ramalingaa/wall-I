import { redirect } from "react-router"
import "./heroimage.css"
import { useNavigate } from 'react-router-dom';

const HeroImage = () => {
        const navigate = useNavigate();

        const authHandler = () => {
                navigate("auth")
        }

    return (
    
           <div className = "hero-text-parent">
            <div>
                    <p className = "hero-text">Revolutionize Your Interview Game.</p>
            </div>
            <div className = "hero-text-btn-container">
                    <button className = "btn" onClick = {authHandler}>Get Started</button>
                    <button className = "btn btn-secondary">Learn More</button>
            </div>
           </div>
           
    
    )
}
export default HeroImage