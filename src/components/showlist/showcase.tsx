import React from 'react';
import { Pagination, Popover } from 'antd';

import { VideosType } from 'src/redux/movie';

import './index.css';

interface Props {
  page: number;
  videos: VideosType;
  fetchSourceDetails: (page: number) => void;
}

export const ShowWeb: React.FC<Props> = ({ page, videos, fetchSourceDetails }) => {
  const { attr: { pagecount } = {} } = videos;

  return (
    <div className="show-web-container">
      <div className="show-web-list">
        {!videos.value.length ? (
          new Array(20).fill(0).map((_, index) => <span className="show-web-pic loading" key={'show' + index} />)
        ) : (
          <React.Fragment>
            {videos.value.map((video) => (
              <span className="show-web-pic" key={video.id}>
                <a href="#">
                  <Popover placement="bottom" title={video.name} content={video.describe || '内详'}>
                    <img src={video.pic} alt={video.name} />
                  </Popover>
                </a>
              </span>
            ))}
          </React.Fragment>
        )}
      </div>
      <div className="show-web-pagination">
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          current={page}
          total={pagecount}
          onChange={fetchSourceDetails}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export const ShowMobile: React.FC = () => {
  return <div className="show-mobile-container"></div>;
};
