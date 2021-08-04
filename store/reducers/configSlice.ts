import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// TODO Look up or ask where to put constants
enum COLOR_MODE {
  System = 'SYSTEM',
  Dark = 'DARK',
  Light = 'LIGHT',
}

interface ConfigState {
  colorMode: COLOR_MODE;
}

const INITIAL_STATE: ConfigState = {
  colorMode: COLOR_MODE.System,
};

const configSlice = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    setColorMode(state, action: PayloadAction<COLOR_MODE>) {
      state.colorMode = action.payload;
    },
  },
});

export default configSlice.reducer;
export const { setColorMode } = configSlice.actions;

export const getColorMode = (state: RootState): COLOR_MODE => state.config.colorMode;
