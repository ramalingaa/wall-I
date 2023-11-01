import BodyContent from "../../components/bodycontent/bodycontent"
import ProcessFlow from "../../components/featurescontent/featurescontent"
import HeroImage from "../../components/heroimage/HeroImage"
import "./landingpage.css"
const LandingPage = () => {


    return (
        <div className="px-6 flex flex-col landing-page-container">
            
            <HeroImage />
            <BodyContent />
            <ProcessFlow />
        </div>
    )
}
export default LandingPage
