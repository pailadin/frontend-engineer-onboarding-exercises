import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface User {
  token: string | null;
  email?: string;
  name?: string;
}

const INITIAL_STATE: User = {
  token: null,
};

const getFakeUserData = createAsyncThunk('user/getFakeUserData', async (data: unknown) => {
  const response = await fetch('/api/hello', {
    method: 'post',
    body: JSON.stringify(data),
  });

  return response.json();
});

const configSlice = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state = action.payload;
    },
    clearUser() {
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [`${getFakeUserData.fulfilled}`]: (state, action) => {
      const { token, email, firstName, lastName } = action.payload;

      return {
        token,
        email,
        name: [firstName, lastName].join(' '),
      };
    },
  },
});

export default configSlice.reducer;
export const { setUser, clearUser } = configSlice.actions;
export { getFakeUserData };

export const getUser = (state: RootState): User => state.user;
