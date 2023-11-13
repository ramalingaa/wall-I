import React from 'react'
import "./about.css"
import {Image, Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import aboutUsImage from "../../imageDB/ideogram (11).jpeg";
import { useAppSelector } from '../../hooks/redux';

const About = () => {

    const { jwtToken } = useAppSelector((state) => state.interview)
    const navigate = useNavigate()
    const redirectToLoginPage = () => {
        navigate("/select-level")
    }
  return (
    <div className="flex flex-col gap-6 aboutus-parent-container">
       <div className = "flex gap-4 aboutus-hero-container">
            <div>
                <Image
                    alt="NextUI hero Image"
                    src={aboutUsImage}
                    className='hero-image-align'
                    />
            </div>
            <div className = "flex flex-col gap-4 align-center">
                <h2 className = "text-xl font-bold">Transform Your Interview Skills with MockMan: Where Practice Meets Precision</h2>
                <p className = "">MockMan tackles the challenges of interview preparation by providing an efficient, stress-free environment for you to hone your skills.Created by engineers for engineers, our platform ensures you're interview-ready and poised to succeed.  By simulating real interview scenarios, our platform offers instant, in-depth feedback on your performance, pinpointing areas of improvement. This targeted approach accelerates your learning curve, effectively transforming interview anxiety into confidence. With MockMan, the interview struggle is a thing of the past—practice becomes productive, and your readiness for even the most demanding interviews is assured.</p>
            </div>
       </div>
       {/* <div className = "align-center flex flex-col gap-4">
            <h2 className="text-xl text-gray-900 font-bold">"Ace Your Interviews with MockMan: Your AI-Driven Practice Partner"</h2>
            <p className = "text-gray-700">Unlock your full potential with MockMan, the cutting-edge Virtual Interview Platform for Engineering Students and Professional Programmers. Powered by AI, we offer a seamless end-to-end interview experience that provides detailed feedback without the need for human intervention. Sharpen your skills, boost your confidence, and conquer any technical challenge with MockMan by your side. Step into success today!</p>
       </div> */}
       <div className = "flex gap-4 howitworks-parent">
            <div className = "flex flex-col gap-4">
                <h2 className = "text-xl font-semibold">How it works</h2>
                <div className = "flex gap-2">
                    <div className="vertical-line"></div>
                    <div className = "flex flex-col gap-4">
                        <div className = "flex flex-col gap-2 how-it-works-card">
                                <svg className="w-5 text-blue-900 active-ico svg-position" stroke="currentColor" stroke-width="2"  stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                <line fill="none" stroke-miterlimit="10" x1="12" y1="2" x2="12" y2="22"></line>
                                <polyline fill="none" stroke-miterlimit="10" points="19,15 12,22 5,15"></polyline>
                                </svg>
                                <h2 className = "font-semibold">Create an account</h2>
                                <p className = "text-gray-600">Sign up for MockMan and create a profile with your basic information, skills, and experience.</p>
                        </div>
                        <div className = "flex flex-col gap-2">
                            <svg className="w-5 text-blue-900 active-ico svg-position" stroke="currentColor" stroke-width="2"  stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <line fill="none" stroke-miterlimit="10" x1="12" y1="2" x2="12" y2="22"></line>
                            <polyline fill="none" stroke-miterlimit="10" points="19,15 12,22 5,15"></polyline>
                            </svg>
                            <h2 className = "font-semibold">Choose a mock interview</h2>
                            <p className = "text-gray-600">Browse through the available mock interviews or request a custom one based on your desired job role or company.</p>
                        </div>
                        <div className = "flex flex-col gap-2">
                            <svg className="w-6 text-blue-900 active-ico svg-position" stroke="currentColor" viewBox="0 0 24 24">
                            <polyline fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="6,12 10,16 18,8"></polyline>
                            </svg>
                            <h2 className = "font-semibold">Receive detailed feedback</h2>
                            <p className = "text-gray-600">Complete the virtual interview and receive instant feedback from our AI system, including areas of improvement and tips to ace your real interviews.</p>
                        </div>
                    </div>
                </div>
                <Button color = "primary" onPress = {redirectToLoginPage}>Get Started</Button>
            </div>
            <div>
                <Image
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        />
            </div>
       </div>
       {/* <div className = "flex gap-4 testimonial-parent">
            <div className = "flex flex-col gap-4">
                <h2 className = "font-semibold text-xl">Testimonials</h2>
                <p className = "text-gray-600">Don't just take our word for it, read from our extensive list of case studies and customer testimonials.</p>
                <Button color = "primary">View Case Studies</Button>
            </div>
            <div>
                <svg className="relative left-0 w-10 h-10 text-blue-300 fill-current active-ico testimonials-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                    <path d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z"></path>
                </svg>
                <div className = "flex flex-col gap-4">
                    <p className="ml-4">"As someone who has been job searching for a while, I cannot recommend MockMan enough. This virtual interview platform is truly revolutionary in its use of AI and detailed feedback. It has helped me improve my interviewing skills and land multiple job offers. The best part? I can practice anytime, anywhere without needing anyone else's help."</p>
                    <p className = "font-semibold">- John Doe CEO XYZ</p>
                </div>
            </div>
       </div> */}
    </div>
  )
}

export default About