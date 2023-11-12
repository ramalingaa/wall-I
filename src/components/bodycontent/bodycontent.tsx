import lightining from "../../imageDB/lightning.png"
import genAI from "../../imageDB/genAi.png"
import balancedFeedback from "../../imageDB/BalancedFeedback.png"


import "./bodycontent.css"
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const BodyContent = () => {
    return (
        <div>
            <h2 className="align-center text-xl font-semibold text-primary">Unlock Your Interview Potential with MockMan</h2>
            <div className="flex gap-4 features-card-container">
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                        <Image
                            width={300}
                            alt="NextUI hero Image"
                            src={lightining}
                            className = "features-image"
                            />
                    </CardHeader>
                    <CardBody className = "flex flex-col gap-4">
                        <p className="text-xl font-semibold">Experience Lightning-Fast Feedback &#9736;</p>
                        <p className="font-light">Receive immediate, nuanced insights on your interview performance. Whether it's a technical grind or a soft skills conversation, our feedback strikes with the precision and speed of thunder.</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                        <Image
                            width={300}
                            alt="NextUI hero Image"
                            src={genAI}
                            className = "features-image"
                            />
                    </CardHeader>
                    <CardBody className = "flex flex-col gap-4">
                        <p className="text-xl font-semibold">Master Your Interview with GenAI Support</p>
                        <p className="font-light">Navigate each phase of your interview seamlessly with GenAI. From crafting challenging questions to offering precise feedback on your responses, GenAI is your personal interview coach.</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                        <Image
                            width={300}
                            alt="NextUI hero Image"
                            src={balancedFeedback}
                            className = "features-image"
                            />
                    </CardHeader>
                    <CardBody className = "flex flex-col gap-4">
                        <p className="text-xl font-semibold">Fair and Balanced Assessments</p>
                        <p className="font-light">Our unique rating system provides you with an unbiased evaluation of every answer, recognizing that not all 'correct' answers show true understanding, and not all 'mistakes' lack insight. Improve continuously with clear, objective feedback designed to enhance your skills for future interviews.</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default BodyContent