import "./heroimage.css"
import { useNavigate } from 'react-router-dom';
import {Input, Image, Button} from "@nextui-org/react";
import {  useAppSelector } from "../../hooks/redux";
import HeroImageFile from "../../imageDB/heroImageHuman.png"
import { useState } from "react";
const HeroImage = () => {
        const [userEmail, setUserEmail] = useState<string>("");
        const { jwtToken } = useAppSelector((state) => state.interview);
        const navigate = useNavigate();
        const authHandler = () => {
                navigate("select-level")     
        }
        const learnMoreHandler = () => {
                navigate("about")
        }
        const getStartedHandler = (e:any) => {
                setUserEmail(e.target.value)
        }
        const storeUserEmailAndRedirectHandler = () => {
                if(jwtToken){
                        navigate("/select-level")
                }
                else {
                        navigate("/login")
                }
        }
        const sizes = ["sm", "md", "lg"];

    return (
        <div className="flex flex-col justify-center gap-4 hero-container">
                <div className="flex flex-col gap-4 ">
                        <h1 className="hero-heading">Elevate Your Interview Readiness with MockMan</h1>
                        <p>Master the art of interviewing on your schedule. MockMan delivers sharp, swift feedback to sharpen your skills like never before.</p>
                        <div className="flex hero-input-button gap-2">
                                {/* {!jwtToken &&<Input size={"md"} type="email" label="" placeholder="Enter your email" onChange = {getStartedHandler}/>} */}
                                <Button color="primary" className = "hero-btn" onPress = {storeUserEmailAndRedirectHandler}>Get Started</Button>
                        </div>
                </div>
                <div className="hero-image-container">
                        <Image
                                width={350}
                                height={200}
                                alt="MockMan hero Image with delay"
                                src={HeroImageFile}
                                className="hero-image-align"
                                />
                </div>
        </div>    
    )
}
export default HeroImage