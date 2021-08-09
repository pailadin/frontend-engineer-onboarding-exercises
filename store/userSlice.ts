import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface User {
  token: string | null;
}

const INITIAL_STATE: User = {
  token: null,
};

const getFakeUserData = createAsyncThunk('user/getFakeUserData', async (data: unknown) => {
  const response = await fetch('/api/fakeUserData', {
    method: 'post',
    body: JSON.stringify(data),
  });

  return response.json();
});

const userSlice = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    // Originally stored email and name, but API just has token. Don't use this one...
    setUser(state, action: PayloadAction<User>) {
      state = action.payload;
    },
    // ...use this instead:
    setUserToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      return state;
    },
    clearUser() {
      return INITIAL_STATE;
    },
  },
  extraReducers: {
    [`${getFakeUserData.fulfilled}`]: (state, action) => {
      const { token } = action.payload;

      return { token };
    },
  },
});

export default userSlice.reducer;
export const { setUser, setUserToken, clearUser } = userSlice.actions;
export { getFakeUserData };

export const getUser = (state: RootState): User => state.user;
export const getUserToken = (state: RootState): string | null => state.user.token;
export const checkIfLoggedIn = (state: RootState): boolean => !!state.user.token;
