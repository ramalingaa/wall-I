import { Card, CardHeader, CardBody, Input, Textarea, Button } from '@nextui-org/react'
import React, { useState } from 'react'
import './contactus.css'
import axios from 'axios'
const ContactUS = () => {
    const [queryUsername, setQueryUsername] = useState('');
    const [userQuery, setUserQuery] = useState('');
    const [queryUserEmail, setQueryUserEmail] = useState('');
    const nameChangeHandler = (e:any) => {
        setQueryUsername(e.target.value)
    }
    const emailChangeHandler = (e:any) => {
        setQueryUserEmail(e.target.value)
    }
    const sendEmailToSupportTeam = () => {
        try {
            let data = {
                service_id: "service_r5smp1p",
                template_id: "",
                user_id: "jd3HxiZJ9pW-y9_Pe",
                template_params: {
                    name: queryUsername,
                    email: queryUserEmail,
                    subject: "Query: user query",
                    body: userQuery,
                }
            }
            const response = axios.post("https://api.emailjs.com/api/v1.0/email/send")
        } catch(e){
            console.log("Error sending email", e)
        }
    }
  return (
        <div className="flex flex-col contactus-container">
            <Card className = "contactus-parent" shadow = "none" radius = "none">
                    <CardHeader>
                        {/* <h1 className="text-xl font-semibold">Have Questions</h1> */}
                    </CardHeader>
                    {/* <CardBody className="flex flex-col gap-4">
                        <Input size={"md"} type="text" label="Your Name" placeholder="Enter your name" onChange = {nameChangeHandler}/>
                        <Input size={"md"} type="email" label="Your Email" placeholder="Enter your email" onChange = {emailChangeHandler}/>
                        <Textarea
                                isInvalid={false}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please enter your query here"
                                errorMessage=""
                                minRows = {5}
                                maxRows = {10}
                                fullWidth = {true}
                                className="w-full textarea-contact"
                                onChange = {(e) => setUserQuery(e.target.value)}
                                value={userQuery}

                                />
                        <Button color="primary" type="submit" onPress = {sendEmailToSupportTeam}>Submit</Button>
                    </CardBody> */}
                    <CardBody>
                        <p className='text-xl'>Have a Query</p>
                        <p className='text-xl'><a href="mailto:ramalinga@mockman.in" className='text-primary'>Send us a mail at ramalinga@mockman.in</a></p>
                        <p className='text-xl'>We will get in touch with you in next 24 hours</p>
                    </CardBody>
            </Card>
        </div>
  )

}

export default ContactUS