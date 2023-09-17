import featureImageOne from "../../imageDB/ideogram (9).jpeg";
import featureImageTwo from "../../imageDB/ideogram (5).jpeg";
import featureImageThree from "../../imageDB/ideogram (7).jpeg";



import "./featurecontent.css"
const FeaturesContent = () => {
    return (
        <div className="feature-content-parent">
            <p className="feature-content-header">Features of Mockman</p>
            <div className = "feature-content-container">
                <div className = "feature-content-single">
                    <img src = {featureImageOne} alt = "interview" className="feature-image-one"/>
                    <p className = "feature-text-one">Interactive Virtual Mock Interviews tailored for your specific industry and role</p>
                </div>
                <div className = "feature-content-single">
                    <img src = {featureImageTwo} alt = "interview" className="feature-image-two"/>
                    <p className = "feature-text-two">Detailed Interview feedback to help you improve and stand out from the competition</p>
                </div>
                <div className = "feature-content-single">
                    <img src = {featureImageThree} alt = "interview" className="feature-image-three"/>
                    <p className = "feature-text-three">Land your dream job with our state-of-art AI tools</p>
                </div>
            </div>
        </div>
    )
}
export default FeaturesContent