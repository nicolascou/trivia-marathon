import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { difficulty, response } from './types';

interface QuestionState {
  category: string;
  difficulty: difficulty;
  response: response;
}

interface setQuestionPayload {
  category: string;
  difficulty: difficulty;
}

const initialState: QuestionState = {
  category: '',
  difficulty: 'easy',
  response: null
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<setQuestionPayload>) => {
      state.category = action.payload.category;
      state.difficulty = action.payload.difficulty;
    },
    setResponse: (state, action: PayloadAction<response>) => {
      state.response = action.payload;
    },
    resetQuestion: (state) => {
      state.category = '';
      state.difficulty = 'easy';
      state.response = null;
    }
  },
})

export const { setQuestion, setResponse, resetQuestion } = questionSlice.actions

export default questionSlice.reducer