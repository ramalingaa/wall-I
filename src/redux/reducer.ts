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
interface QuestionAnswerState {
  allQuestionAnswerData: QuestionAnswer[];
  allQuestionAnswerFeedbackData: QuestionAnswerFeedback[];
  currentEditorData:String;
}


const initialState: QuestionAnswerState = {
    allQuestionAnswerData: [],
    allQuestionAnswerFeedbackData: [],
    currentEditorData:"",

};

const counterSlice = createSlice({
  name: 'counter',
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
    }

  },
});

export const { addQuestionAnswer, addQuestionAnswerFeedback } = counterSlice.actions;
export default counterSlice.reducer;
