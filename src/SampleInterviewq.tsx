import React, { useState } from "react";
import { Input, Button, Card, CardHeader, CardBody, Textarea} from "@nextui-org/react";
import axios from "axios";
const InterviewQuestions = () => {
//   const { nonDSAquestionDataForInterview } = useAppSelector(
//     (state) => state.interview
//   );
  const nonDSAquestionDataForInterview = {
    "questions": [
        {
            "skill": "JavaScript",
            "questions": [
                "What are some of the advanced features of JavaScript that you have utilized in your projects?",
                "Explain how JavaScript async and await work with an example.",
                "How do closures work in JavaScript, and can you provide a practical use case for them?",
                "What is event delegation in JavaScript, and why is it important in a web application?"
            ],
            "weightage": 0.9
        },
        {
            "skill": "TypeScript",
            "questions": [
                "What are the benefits of using TypeScript over JavaScript?",
                "Describe how you manage large-scale TypeScript applications.",
                "Explain TypeScript interfaces and how they differ from types.",
                "How do generics work in TypeScript, and can you provide an example of their use?"
            ],
            "weightage": 0.9
        },
        {
            "skill": "React.js",
            "questions": [
                "Can you describe the differences between class components and functional components in React?",
                "What problems do React hooks solve, and how do you use them in your projects?",
                "How would you handle state management in a complex React application?",
                "Explain the virtual DOM and its importance in React."
            ],
            "weightage": 0.9
        },
        {
            "skill": "Problem-solving",
            "questions": [
                "Describe a challenging problem you encountered in a project and how you solved it?",
                "How do you approach debugging a complex piece of code?",
                "Can you walk us through a problem where you had to think out of the box to find a solution?"
            ],
            "weightage": 0.8
        },
        {
            "skill": "Redux",
            "questions": [
                "How does Redux work, and what are its major components?",
                "Explain the concept of middleware in Redux and give an example of how you have used it.",
                "What are some common pitfalls when using Redux, and how can they be avoided?"
            ],
            "weightage": 0.6
        },
        {
            "skill": "MobX",
            "questions": [
                "How does MobX differ from Redux in terms of state management?",
                "Explain how MobX stores and actions work.",
                "When would you choose MobX over other state management solutions?"
            ],
            "weightage": 0.6
        },
        {
            "skill": "Git",
            "questions": [
                "How do you handle merge conflicts in Git?",
                "Explain the difference between `git fetch` and `git pull`.",
                "What strategies do you use for branching in Git?"
            ],
            "weightage": 0.6
        },
        {
            "skill": "CI/CD (bitbucket pipeline)",
            "questions": [
                "What is a CI/CD pipeline, and why is it important for development?",
                "Describe a typical workflow for setting up a Bitbucket pipeline.",
                "How can you ensure that your CI/CD pipeline is efficient and reliable?"
            ],
            "weightage": 0.6
        },
        {
            "skill": "Web Markup (HTML5 & CSS3)",
            "questions": [
                "How do you ensure that your web pages are responsive?",
                "Explain the difference between flexbox and grid layouts in CSS.",
                "What semantic HTML tags do you use to improve accessibility?"
            ],
            "weightage": 0.6
        },
        {
            "skill": "SCRUM",
            "questions": [
                "What roles have you played in a SCRUM team?",
                "How do you handle changing requirements in the middle of a sprint?",
                "Explain the importance of the sprint retrospective in the SCRUM process."
            ],
            "weightage": 0.6
        },
        {
            "skill": "Communication and collaboration",
            "questions": [
                "Provide an example of a time you had to resolve conflicts within a team.",
                "How do you ensure effective communication with remote team members?",
                "What strategies do you use to promote collaboration in a distributed team?"
            ],
            "weightage": 0.6
        }
    ]
}

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ skill: string; question: string; answer: string }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const skills = nonDSAquestionDataForInterview?.questions || [];

  if (skills.length === 0) {
    return <p>No questions available for the interview.</p>;
  }

  const handleSubmitAnswer = async () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers.push({
      skill: skills[currentSkillIndex].skill,
      question: skills[currentSkillIndex].questions[currentQuestionIndex],
      answer: currentAnswer,
    });
    setUserAnswers(updatedAnswers);
    setCurrentAnswer("");
    try {
        const questionAnswerAnalysisForCurrentQuestion = await axios.post(
            "https://9lut6mmui6.execute-api.ap-south-1.amazonaws.com/Develop/getqnaanalysis", // Replace with your API endpoint
            {
              question: skills[currentSkillIndex].questions[currentQuestionIndex],
              answer: currentAnswer
            },
            {
              headers: {
                "Content-Type": "application/json",
                
              },
            }
          );
        console.log('questionAnswerAnalysisForCurrentQuestion',JSON.parse(questionAnswerAnalysisForCurrentQuestion.data.body))
    } catch (error) {
        console.error('Error during API call:', error);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < skills[currentSkillIndex].questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      const nextSkillIndex = currentSkillIndex + 1;
      if (nextSkillIndex < skills.length) {
        setCurrentSkillIndex(nextSkillIndex);
        setCurrentQuestionIndex(0);
      } else {
        alert("You have completed all questions!");
      }
    }
  };
  console.log('setUserAnswers',userAnswers)
  const currentSkill = skills[currentSkillIndex];
  const currentQuestion = currentSkill.questions[currentQuestionIndex];

  return (
    <div className = "interview-text-parent pt-6">
        <p className = "flex gap-2 justify-start px-4 font-bold" >{currentSkill.skill}</p>
            <Card className="w-full align-center pb-4 interviewtext-card-container">
                    <CardHeader className="feedback-header">
                        <div>
                            
                            <p>{currentQuestion}</p>
                        </div>

                    </CardHeader>
                    <CardBody className = "flex flex-col gap-2 textarea-container">   
                        <Textarea
                                isInvalid={false}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Enter your Answer Here"
                                errorMessage=""
                                minRows = {20}
                                maxRows = {30}
                                fullWidth = {true}
                                className="w-full textarea-interview"
                                onChange = {(e) => setCurrentAnswer(e.target.value)}
                                value = {currentAnswer}
                                />
                    </CardBody>
                    <div className = "flex gap-6 justify-center">
                        <Button
                            onClick={handleSubmitAnswer}
                            disabled={!currentAnswer}
                        >
                            Submit and Next
                        </Button>
                    </div>
              </Card>
    </div>
    
  );
};

export default InterviewQuestions;
