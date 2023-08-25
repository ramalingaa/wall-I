import React from 'react'
import "./about.css"
const About = () => {
  return (
    <div className="about-parent-page">
        <div className='about-parent-container'>
            <div className='about-hero-container'>
                <h1>Revolutionize your mock interviews.</h1>
            </div>
            <div className='about-meet-container'>
                <h2>Meet Your Virtual Interviewer</h2>
                <div className='about-meet-inner'>
                    <p>Say goodbye to traditional mock interviews and embrace the future with our automated virtual interview platform. No more struggling to coordinate schedules or stressing over biased feedback.</p>
                    <p>Our AI-powered solution ensures utmost accuracy and comprehensiveness in evaluating your performance, all while saving time and resources in the process.</p>
                </div>
            </div>
            <div className='about-meet-container'>
                <h2>How We Help You</h2>
                <video controls>
                    <source src="/videos/Demo.webm" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className='about-help-inner'>

                    <p>Our platform covers the entire interview process – from asking questions adapted to your profile to providing detailed feedback on your performance.</p>
                    <p>Using cutting-edge AI technology, our virtual interviewer is able to precisely evaluate your responses, body language, and overall demeanor, ensuring you’re fully prepared to nail your next interview.</p>
                    <p>With a user-friendly interface and seamless integration into your everyday routine, our virtual interview platform makes stepping up your interview skills easier than ever before.</p>

                </div>
            </div>
        </div>
    </div>
  )
}

export default About