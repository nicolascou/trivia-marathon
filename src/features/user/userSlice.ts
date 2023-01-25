import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string;
  points: number;
}

const initialState: UserState = {
  name: '',
  points: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addPoint: (state) => {
      state.points += 1;
    },
    resetUser: (state) => {
      state.name = '';
      state.points = 0;
    }
  },
})

export const { setUsername, addPoint, resetUser } = userSlice.actions

export default userSlice.reducer