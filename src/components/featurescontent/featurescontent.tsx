import featureImageOne from "../../imageDB/featurcontante1.png";
import featureImageTwo from "../../imageDB/featurcontante2.png";
import featureImageThree from "../../imageDB/featurcontante3.png";



import "./featurecontent.css"
const FeaturesContent = () => {
    return (
        <div className="feature-content-parent">
            <p className="feature-content-header">Features of Mockman</p>
            <div className = "feature-content-container">
                <div className = "feature-content-single">
                    <img src = {featureImageOne} alt = "interview" />
                    <p>Interactive Virtual Mock Interviews tailored for your specific industry and role</p>
                </div>
                <div className = "feature-content-single">
                    <img src = {featureImageTwo} alt = "interview" />
                    <p>Detailed Interview feedback to help you improve and stand out from the competition</p>
                </div>
                <div className = "feature-content-single">
                    <img src = {featureImageThree} alt = "interview" />
                    <p>Land your dream job with our state-of-art AI tools</p>
                </div>
            </div>
        </div>
    )
}
export default FeaturesContent