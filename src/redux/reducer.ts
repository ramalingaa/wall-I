// store/reducers/counterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store'
const interviewQuestionExample = ["What are the different data types available in JavaScript?"]
const dsaQuestion = [{
  question: "DSA: You are given the head of a singly linked list. Reverse the list and return its head.",
  suggestions: "",
  example: {
    input: "'1 -> 2 -> 3 -> 4 -> 5'",
    output: "'5 -> 4 -> 3 -> 2 -> 1'",
    explanation: "The function should take in a string and return the reversed string."
    },
    
}
]
export interface QuestionAnswer {
    question: string
    answer: string
    time?: number
    suggestions?: string
    language?: string
}
export interface QuestionAnswerFeedback extends QuestionAnswer {
    feedback: string
    suggestedcode?:string
    explanation?: string
    rating:number
    time_complexity?: string
    space_complexity?: string
}
interface AudioAnswers {
  audio: AudioBuffer
  question: string
}
interface UserDetails {
  username: string
  email: string
  credit: string
  userId: string
}
interface InitialState {
  allQuestionAnswerData: QuestionAnswer[];
  allQuestionAnswerFeedbackData: QuestionAnswerFeedback[];
  currentEditorData:String;
  jwtToken: string;
  audioAnswers: AudioAnswers[];
  nonDSAquestionDataForInterview: string[];
  failedFeedbackAPICallQueue: QuestionAnswer[];
  userDetails: UserDetails,
  userInterviewHistoryData: [];
  dsaQuestionDataForInterview: DSAQuestion[];
}


interface DSAQuestion {
  question: string,
  suggestions: string,
  example: {
    input: string,
    output: string,
    explanation: string
  }
}
const initialState: InitialState = {
    allQuestionAnswerData: [],
    allQuestionAnswerFeedbackData: [],
    currentEditorData:"",
    jwtToken : "",
    audioAnswers:[],
    nonDSAquestionDataForInterview:[...interviewQuestionExample],
  dsaQuestionDataForInterview: [...dsaQuestion],
    failedFeedbackAPICallQueue: [],
    userDetails: {
      username: '',
      email: '',
      credit: '',
      userId: '',
    },
    userInterviewHistoryData: []

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
      state.nonDSAquestionDataForInterview = payload.payload.nonDSAArray;
      state.dsaQuestionDataForInterview = payload.payload.dsaArray;
    },
    updateJwtToken(state, payload){
      state.jwtToken = payload.payload
    },
    updateAudioAnswers(state, payload){
      state.audioAnswers = [...state.audioAnswers, payload.payload]
    },
    updateUserDetails(state, payload){
      state.userDetails = payload.payload
    },
    updateUserInterviewHistoryData(state, payload){
      state.userInterviewHistoryData = payload.payload
    },
    addFailedFeedbackAPIData(state, payload){
      state.failedFeedbackAPICallQueue = [...state.failedFeedbackAPICallQueue, payload.payload]
    },
    removeFailedFeedbackAPIData(state, payload){
      const filteredFeedbackQueue = state.failedFeedbackAPICallQueue.filter((feedback) => feedback.question !== payload.payload.question)
      state.failedFeedbackAPICallQueue = filteredFeedbackQueue
    },
    resetInterviewState(state){
      state.allQuestionAnswerData = []
      state.allQuestionAnswerFeedbackData = []
      state.audioAnswers = []
      state.currentEditorData = ""
      state.jwtToken = ""
      state.failedFeedbackAPICallQueue = []
      state.userDetails = {
        username: '',
        email: '',
        credit: '',
        userId: '',
      }
      state.userInterviewHistoryData = []
    },
    resetPrevInterviewFeedbackData(state){
      state.allQuestionAnswerFeedbackData = []
      state.allQuestionAnswerData = []
      state.nonDSAquestionDataForInterview = []
      state.dsaQuestionDataForInterview = []
      state.failedFeedbackAPICallQueue = []
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
        removeFailedFeedbackAPIData,
        updateUserDetails,
        updateUserInterviewHistoryData,
        resetPrevInterviewFeedbackData
            } = counterSlice.actions;
export default counterSlice.reducer;
