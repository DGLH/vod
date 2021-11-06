import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OtherState {
  loading: boolean;
  cancelAction?: string;
}

const initialState: OtherState = {
  loading: false,
};

export const OtherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    toggleLoading(state, action: PayloadAction<boolean>) {
      return { ...state, loading: action.payload };
    },
    setCancelAction(state, action: PayloadAction<string>) {
      return { ...state, cancelAction: action.payload };
    },
  },
});

export const actions = OtherSlice.actions;
