import BodyContent from "../components/bodycontent/bodycontent"
import ClientSection from "../components/clientsection/clientsection"
import ProcessFlow from "../components/featurescontent/featurescontent"
import Footer from "../components/footer/footer"
import HeroImage from "../components/heroimage/HeroImage"
import Navbar from "../components/navbar/navbar"
import "./landingpage.css"
const LandingPage = () => {


    return (
        <div className="px-6 flex flex-col landing-page-container">
            <HeroImage />
            <BodyContent />
            <ProcessFlow />
            <ClientSection />
        </div>
    )
}
export default LandingPage
