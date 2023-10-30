import featureImageOne from "../../imageDB/ideogram (9).jpeg";
import featureImageTwo from "../../imageDB/ideogram (5).jpeg";
import featureImageThree from "../../imageDB/ideogram (7).jpeg";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";



import "./featurecontent.css"
const ProcessFlow = () => {
    return (
        <div>
            <h2 className="align-center text-xl font-semibold text-primary">Three Easy Steps to Prepare</h2>
            <div className="flex process-flow-container">
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                    <Image
                        width={300}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        />
                    </CardHeader>
                    <CardBody>
                        <h1 className="text-xl font-semibold">Get Your Requirement Right</h1>
                        <p className="font-light">Choose Your Language, Experience, number of questions and DSA if Required. This Step Will Generate Interview Questions For You.</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                    <Image
                        width={300}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        />
                    </CardHeader>
                    <CardBody>
                        <h1 className="text-xl font-semibold">Answer The Questions</h1>
                        <p className="font-light">Once You are On the Interview Space, You can Answer the Questions, If not You can Skip the Question. Questions which are skipped will not have a feedback However If not skipped You get a feedback</p>
                    </CardBody>
                </Card>
                <Card className="max-w-[400px] features-cart" shadow = "none" radius = "none">
                    <CardHeader>
                    <Image
                        width={300}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                        />
                    </CardHeader>
                    <CardBody>
                        <h1 className="text-xl font-semibold">Finally The Feedback</h1>
                        <p className="font-light">Once You are Done With Your Interview, You can View Your Feedback for Every question. That's not all You can see Rating. This Metric helps you improving your changes in your next Interview.</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default ProcessFlow