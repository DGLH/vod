import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VideosValueType {
  id: number; // 视频 id
  name: string; // 视频名
  tid: number; // 视频类型 id
  area: string; // 地域
  lang: string; // 语言
  year: number; // 年份
  note?: string; // 更新状态 ex: 更新至 xx，完结
  actor?: string; // 演员
  director?: string; // 导演
  describe?: string; // 简介
  last?: string; // 最后更新时间
  pic: string; // 影视图地址
  type: number;
  source: Array<{ flag: string; address: string }>; // 视频源，flag 是播放类型，address 是播放地址
}

export interface VideosType {
  value: Array<VideosValueType>;
  attr: {
    page: number;
    pagecount: number;
    pagesize: number;
    recordcount: number;
  };
}

export interface ClassType {
  id: number;
  name: string;
}

export interface movieSource {
  class: Array<ClassType>;
  videos: VideosType;
}

const initialState: movieSource = {
  class: [],
  videos: {
    value: [],
    attr: {
      page: 1,
      pagecount: 0,
      pagesize: 0,
      recordcount: 0,
    },
  },
};

export const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setClass(state, action: PayloadAction<Array<ClassType>>) {
      return { ...state, class: action.payload };
    },
    setVideos(state, action: PayloadAction<VideosType>) {
      return { ...state, videos: action.payload };
    },
    clearVideosValue(state) {
      return { ...state, videos: { attr: state.videos.attr, value: [] } };
    },
  },
});

export const actions = MovieSlice.actions;
