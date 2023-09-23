// store/reducers/counterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store'

export interface QuestionAnswer {
    question: string
    answer: string
    time?: number
}
export interface QuestionAnswerFeedback extends QuestionAnswer {
    feedback: string
    rating:number
}
interface AudioAnswers {
  audio: AudioBuffer
  question: string
}
interface InitialState {
  allQuestionAnswerData: QuestionAnswer[];
  allQuestionAnswerFeedbackData: QuestionAnswerFeedback[];
  currentEditorData:String;
  jwtToken: string;
  audioAnswers: AudioAnswers[];
  questionDataForInterview: string[];
  failedFeedbackAPICallQueue: QuestionAnswer[];
}



const initialState: InitialState = {
    allQuestionAnswerData: [],
    allQuestionAnswerFeedbackData: [],
    currentEditorData:"",
    jwtToken : "",
    audioAnswers:[],
    questionDataForInterview:[
      "What is a closure in JavaScript, and why is it useful?",
      "Explain the differences between let, const, and var for declaring variables in JavaScript.",
      "What is the purpose of the map() function in JavaScript, and how does it differ from forEach()?"
    ],
    failedFeedbackAPICallQueue: []

};

const counterSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    addQuestionAnswer(state, payload) {
        const qnDA = {
            question: payload.payload.question,
            answer: payload.payload.answer,
        }
      state.allQuestionAnswerData = [...state.allQuestionAnswerData, qnDA]
    },
    addQuestionAnswerFeedback(state, payload){
        state.allQuestionAnswerFeedbackData = [...state.allQuestionAnswerFeedbackData, payload.payload]
    },
    updateCurrentEditorData(state, payload){
      state.currentEditorData = payload.payload;
    },
    addInterviewQuestionData(state, payload){
      state.questionDataForInterview = payload.payload
    },
    updateJwtToken(state, payload){
      state.jwtToken = payload.payload
    },
    updateAudioAnswers(state, payload){
      state.audioAnswers = [...state.audioAnswers, payload.payload]
    },
    addFailedFeedbackAPIData(state, payload){
      state.failedFeedbackAPICallQueue = [...state.failedFeedbackAPICallQueue, payload.payload]
    },
    removeFailedFeedbackAPIData(state, payload){
      const filteredFeedbackQueue = state.failedFeedbackAPICallQueue.filter((feedback) => feedback.question !== payload.payload.question)
      state.failedFeedbackAPICallQueue = filteredFeedbackQueue
    },
    resetInterviewState(state){
      state = initialState
    }

  },
});

export const { 
        addInterviewQuestionData,
        addQuestionAnswer, 
        addQuestionAnswerFeedback, 
        updateJwtToken, 
        resetInterviewState, 
        updateAudioAnswers,
        addFailedFeedbackAPIData,
        removeFailedFeedbackAPIData 
            } = counterSlice.actions;
export default counterSlice.reducer;
