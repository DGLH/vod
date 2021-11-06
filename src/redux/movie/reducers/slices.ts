import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Videos {
  id: number; // 视频 id
  name: string; // 视频名
  tid: number; // 视频类型 id
  area: string; // 地域
  lang: string; // 语言
  year: number; // 年份
  note?: string; // 更新状态 ex: 更新至 xx，完结
  actor?: string; // 演员
  diector?: string; // 导演
  describe?: string; // 简介
  source: Array<{ flag: string; address: string }>; // 视频源，flag 是播放类型，address 是播放地址
}

export interface ClassType {
  id: number;
  name: string;
}

export interface movieSource {
  class: Array<ClassType>;
  videos: Array<Videos>;
}

const initialState: movieSource = {
  class: [],
  videos: [],
};

export const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setClass(state, action: PayloadAction<Array<ClassType>>) {
      return { ...state, class: action.payload };
    },
    setVideos(state, action: PayloadAction<Array<Videos>>) {
      return { ...state, videos: action.payload };
    },
  },
});

export const actions = MovieSlice.actions;
