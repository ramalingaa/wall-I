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
}
interface InitialState {
  allQuestionAnswerData: QuestionAnswer[];
  allQuestionAnswerFeedbackData: QuestionAnswerFeedback[];
  currentEditorData:String;
  jwtToken: string
}


const initialState: InitialState = {
    allQuestionAnswerData: [],
    allQuestionAnswerFeedbackData: [],
    currentEditorData:"",
    jwtToken : ""

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
    updateJwtToken(state, payload){
      state.jwtToken = payload.payload
    }

  },
});

export const { addQuestionAnswer, addQuestionAnswerFeedback, updateJwtToken } = counterSlice.actions;
export default counterSlice.reducer;
