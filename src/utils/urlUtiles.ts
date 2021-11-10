export interface Params {
  t: string;
  pg: string;
  wd: string;
  h: string;
  ids: number[];
}

export const formatUrl = (params: Partial<Params>) =>
  `${params.t ? `&t=${params.t}` : ''}${params.pg ? `&pg=${params.pg}` : ''}${params.wd ? `&wd=${params.wd}` : ''}${
    params.h ? `&h=${params.h}` : ''
  }${params.ids ? `&ids=${params.ids.join(',')}` : ''}`;
