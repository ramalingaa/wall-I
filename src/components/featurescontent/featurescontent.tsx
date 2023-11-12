import featureImageOne from "../../imageDB/Features_001.jpeg"
import featureImageTwo from "../../imageDB/ideogram (2).jpeg";
import featureImageThree from "../../imageDB/ideogram.jpeg";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";



import "./featurecontent.css"
const ProcessFlow = () => {
    return (
        <div>
            <h2 className="align-center text-xl font-semibold text-primary m-">Three Easy Steps to Prepare</h2>
            <div className="flex process-flow-container">
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                    <Image
                        width={300}
                        alt="NextUI hero Image"
                        src={featureImageOne}
                        className = "features-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <h1 className="text-xl font-semibold">Customize Your Path to Success</h1>
                        <p className="font-light">Choose Your Language, Experience, number of questions and DSA if Required. This Step Will Generate Interview Questions For You.</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                    <Image
                        width={300}
                        alt="NextUI hero Image"
                        src={featureImageTwo}
                        className = "features-image"

                        />
                    </CardHeader>
                    <CardBody>
                        <h1 className="text-xl font-semibold">Engage With Your Interview</h1>
                        <p className="font-light">Step into your tailored interview space and tackle the questions. Choose to respond or skip — but remember, only answered questions receive insightful feedback to guide your progress.</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                    <Image
                        width={300}
                        alt="NextUI hero Image"
                        src={featureImageThree}
                        className = "features-image"

                        />
                    </CardHeader>
                    <CardBody>
                        <h1 className="text-xl font-semibold">Discover Your Interview Insights</h1>
                        <p className="font-light">Complete your interview and dive into comprehensive feedback for each question, paired with a performance rating. Use these metrics as your roadmap for continuous improvement and success in upcoming interviews.</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default ProcessFlow