import BodyImage from "../../imageDB/bodyImage.png"
import "./bodycontent.css"
const BodyContent = () => {
    return (
        <div className = "bodycontent-container">
            <div className = "bodycontent-text-container">
                <p className = "bodycontent-header">Unleash Your Full Potential</p>
                <p>
                    MockMan offers an unparalleled mock interview experience, designed to boost your confidence and prepare you for the real thing. With our state-of-the-art platform, you’ll be ready to nail any interview thrown your way.
                </p>
            </div>
            <div  className = "bodycontent-img-container">
                <img src={BodyImage} alt = "portrayal of candidate giving interview" className="bodycontent-image-align"/>
            </div>
        </div>
    )
}
export default BodyContent