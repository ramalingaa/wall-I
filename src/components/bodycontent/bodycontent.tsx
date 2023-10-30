import BodyImage from "../../imageDB/ideogram (3).jpeg"
import "./bodycontent.css"
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const BodyContent = () => {
    return (
        <div className="">
            <h2 className="align-center text-xl font-semibold text-primary">Why MockMan Is The Best</h2>
            <div className="flex gap-4 features-card-container">
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardBody className = "flex flex-col gap-4">
                        <p className="text-xl font-semibold">Feedback Like Never Before &#9736;</p>
                        <p className="font-light">Get Instant Subtle Feedback of Your Interview Whether Technical or Non-Technical, You Get The Feedback Like a Thunder</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardBody className = "flex flex-col gap-4">
                        <p className="text-xl font-semibold">Get Interviewed By GenAI</p>
                        <p className="font-light">Every Step of Your Interview Process Is Supported by GenAI from Generating Interview Questions to Providing Feedback on Each Question</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardBody className = "flex flex-col gap-4">
                        <p className="text-xl font-semibold">No Bias Rating</p>
                        <p className="font-light">Whether You are Right or Wrong, You will be Judged. Not All Rights are Correct and Not all Wrongs are Wrongs That's Why You Get Rating For Every Question.All Interviews Follow Rating System Which Ranks Candidates Based on their Performance. So This Metric Helps You Focusing on Improvements in Your Next Interview</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default BodyContent