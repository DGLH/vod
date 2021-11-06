import { WatchHistory } from 'src/redux/usr';
import moment from 'moment';

export const formateTimeline = (timelines: Array<WatchHistory>) => {
  const timelineResult: Array<{ time: string; historys: Array<WatchHistory> }> = [
    {
      time: '一天内',
      historys: [],
    },
    {
      time: '两天内',
      historys: [],
    },
    {
      time: '七天内',
      historys: [],
    },
    {
      time: '三十天内',
      historys: [],
    },
    {
      time: '更早',
      historys: [],
    },
  ];

  timelines.forEach((time) => {
    const diffDay = moment(new Date()).diff(moment(time.watchDate), 'days');
    if (diffDay === 0) {
      timelineResult[0].historys.push(time);
    } else if (diffDay === 1) {
      timelineResult[1].historys.push(time);
    } else if (diffDay <= 7) {
      timelineResult[2].historys.push(time);
    } else if (diffDay <= 30) {
      timelineResult[3].historys.push(time);
    } else {
      timelineResult[4].historys.push(time);
    }
  });

  return timelineResult.filter((tiem) => tiem.historys.length);
};
