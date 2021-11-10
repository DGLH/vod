import { ClassType, VideosType, VideosValueType } from 'src/redux/movie';

export interface ClassInput {
  rss: [
    {
      class: [
        {
          ty: Array<{
            _attr: {
              id: { _value: number };
            };
            _text: string;
          }>;
        },
      ];
    },
  ];
}

type formatXMLClassFunction = (input: ClassInput) => Array<ClassType>;

export const formatXMLClass: formatXMLClassFunction = (input) => {
  const tys = input?.rss[0]?.class[0]?.ty;

  if (!tys) throw 'get error';

  return tys.map((ty) => ({ id: ty._attr.id._value, name: ty._text }));
};

type AttrType<T> = [{ _text: T }];
type _AttrType<T> = { _value: T };

export interface DetailsInput {
  rss: [
    {
      list: [
        {
          video: Array<{
            actor: AttrType<string>;
            area: AttrType<string>;
            des: AttrType<string>;
            director: AttrType<string>;
            id: AttrType<number>;
            lang: AttrType<string>;
            last: AttrType<string>;
            name: AttrType<string>;
            note: AttrType<string>;
            pic: AttrType<string>;
            tid: AttrType<number>;
            type: AttrType<number>;
            year: AttrType<number>;
            dl: [
              {
                dd: [
                  {
                    _attr: {
                      flag: _AttrType<string>;
                    };
                    _text: string;
                  },
                ];
              },
            ];
          }>;
          _attr: {
            page: _AttrType<number>;
            pagecount: _AttrType<number>;
            pagesize: _AttrType<number>;
            recordcount: _AttrType<number>;
          };
        },
      ];
    },
  ];
}

type formatXMLDetailsFunction = (input: DetailsInput) => VideosType;

export const formatXMLDetails: formatXMLDetailsFunction = (input) => {
  const videos = input?.rss[0]?.list[0]?.video;
  const _attr = input?.rss[0]?.list[0]?._attr;

  const domNode = document.createElement('span');

  if (!videos) throw 'get error';

  const value: Array<VideosValueType> = videos.map((video) => {
    domNode.innerHTML = video.des[0]._text;
    return {
      id: video.id[0]._text,
      name: video.name[0]._text,
      tid: video.tid[0]._text,
      area: video.area[0]._text,
      lang: video.lang[0]._text,
      year: video.year[0]._text,
      note: video.note[0]._text,
      actor: video.actor[0]._text,
      director: video.director[0]._text,
      describe: domNode.innerText, // video.des[0]._text 某些 video 的信息会有 dom 元素和转义字符
      last: video.last[0]._text,
      pic: video.pic[0]._text,
      type: video.type[0]._text,
      source: video.dl[0].dd.map((d) => ({ flag: d._attr.flag._value, address: d._text })),
    };
  });

  const attr = {
    page: _attr.page._value,
    pagecount: _attr.pagecount._value,
    pagesize: _attr.pagesize._value,
    recordcount: _attr.recordcount._value,
  };

  return { value, attr };
};
