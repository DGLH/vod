import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SOURCE } from 'src/utils/constant';

export interface WatchHistory {
  movieName: string; // 观看影片名
  watchDate: Date; // 观看日期
}

export interface UsrInfo {
  name: string | null | undefined;
  avatar?: string;
}

export interface Source {
  label: string;
  address: string;
}

export interface UsrSource {
  currentSource: Source;
  ownSource: Array<Source>;
}

export interface UsrState {
  usrInfo: UsrInfo;
  watchHistory: Array<WatchHistory>;
  usrSource: UsrSource;
}

const initialState: UsrState = {
  usrInfo: {
    name: null,
  },
  watchHistory: [
    {
      movieName: 'wss',
      watchDate: new Date(),
    },
  ],
  usrSource: {
    currentSource: {
      label: '百度资源',
      address: SOURCE.get('百度资源')!,
    },
    ownSource: [],
  },
};

export const UsrSlice = createSlice({
  name: 'usr',
  initialState,
  reducers: {
    setUsrInfo(state, action: PayloadAction<UsrInfo>) {
      return { ...state, usrInfo: action.payload };
    },
    setHistory(state, action: PayloadAction<WatchHistory>) {
      return { ...state, watchHistory: [action.payload, ...state.watchHistory] };
    },
    setCurrentSource(state, action: PayloadAction<Source>) {
      return { ...state, usrSource: { ...state.usrSource, currentSource: action.payload } };
    },
    setOwnSource(state, action: PayloadAction<Source>) {
      return { ...state, usrSource: { ...state.usrSource, ownSource: [...state.usrSource.ownSource, action.payload] } };
    },
  },
});

export const actions = UsrSlice.actions;
