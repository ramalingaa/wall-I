// import { useAppSelector, useAppDispatch } from './hooks/redux'

// const useGetFeedbackFromAgent = async() => {

//     const { allQuestionAnswerData } = useAppSelector((state) => state.counter
//     )

//     try {
//         const response = await fetch("http://localhost:8080/api/generate", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ answer: transcribedText, question: questionData[currentQuestionIndex.current] }),
//         });
  
//         const responseData = await response.json();
//         if (response.status !== 200) {
//           throw responseData.error || new Error(`Request failed with status ${response.status}`);
//         }
  
//         console.log(responseData)
//         const currentQuestionAllData = {
//           question: questionData[currentQuestionIndex.current],
//           answer: transcribedText,
//           feedback:responseData.result
//         }
//         setAllInData((prev) => [...prev,currentQuestionAllData])
  
//       } catch(error) {
//         // Consider implementing your own error handling logic here
//         console.error(error);
        
//       }
// }