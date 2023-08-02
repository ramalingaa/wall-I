import BodyContent from "../components/bodycontent/bodycontent"
import FeaturesContent from "../components/featurescontent/featurescontent"
import HeroImage from "../components/heroimage/HeroImage"
import Navbar from "../components/navbar/navbar"
import "./landingpage.css"
const LandingPage = () => {


    return (
        <div >
           <div className="landing-page-parent">
            <div className="landing-page-container">
                    <Navbar />
                    <HeroImage />
                    
            </div>
           </div>
           <div  className="landing-page-container">
                <BodyContent />
           </div>
           <div className="landing-page-parent">
            <div className="landing-page-container">
                    <FeaturesContent />
            </div>
           </div>
        </div>
    )
}
export default LandingPage