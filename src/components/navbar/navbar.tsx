import React, { useCallback, useMemo } from 'react';
import { Input, Dropdown, Menu, Timeline } from 'antd';

import { SOURCE } from 'src/utils/constant';
import Logo from 'src/favicon.svg';
import { historySvg, favoriteSvg } from 'assets/svg';
import { usrPng } from 'assets/png';

import './index.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { usrInfoSelector, usrSourceSelector, watchHistorySelector, actions as usrActions } from 'src/redux/usr';
import { formateTimeline } from 'utils/timelineFormate';

const { Search } = Input;

const Web: React.FC<ReduxProps> = ({ watchHistory, usrSource, setCurrentSource }) => {
  const searchHandle = useCallback((search: string) => {
    console.log(search);
  }, []);

  const menu = useMemo(() => {
    const onClick = ({ key }: { key: string }) => {
      const select = SOURCE.get(key);
      setCurrentSource({ label: key, address: select! });
    };

    return (
      <Menu onClick={onClick}>
        {Array.from(SOURCE.keys()).map((key: string) => {
          return (
            <Menu.Item key={key}>
              <span>{key}</span>
            </Menu.Item>
          );
        })}
        {/* <Menu.Divider />
        <Menu.Item key="create">添加新视频源+</Menu.Item> */}
      </Menu>
    );
  }, [setCurrentSource]);

  const timeline = useMemo(() => {
    const formatTimeline = formateTimeline(watchHistory);

    return (
      <div className="timeline-container">
        <div className="timeline-header">历史记录</div>
        <div className="timeline-body">
          <Timeline pending={false}>
            {formatTimeline.map((tl) => (
              <Timeline.Item color="gray" key={tl.time}>
                <div>{tl.time}</div>
                {tl.historys.map((history) => (
                  <div key={history.movieName + history.watchDate}>{history.movieName}</div>
                ))}
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
        <div className="timeline-footer">查看全部记录</div>
      </div>
    );
  }, [watchHistory]);

  return (
    <div className="navbar-web-contaier">
      <span className="navbar-web-contaier-item">
        <span className="navbar-web-logo">
          <img src={Logo} alt="logo" />
        </span>
        <span className="navbar-web-logo-name">
          <span>下饭视频</span>
          <span>美好恰饭时光 </span>
        </span>

        <span className="navbar-web-source-name">
          <span>
            当前视频源：
            <Dropdown overlay={menu} placement="bottomCenter">
              <p className="ant-dropdown-link">{usrSource.currentSource.label}</p>
            </Dropdown>
          </span>
        </span>
      </span>

      <span className="navbar-web-contaier-item">
        <Search
          className="navbar-web-search"
          placeholder="搜电影、电视剧"
          allowClear
          enterButton
          size="large"
          onSearch={searchHandle}
        />
      </span>

      <span className="navbar-web-contaier-item self-info">
        <span className="history-img">
          <Dropdown overlay={timeline} placement="bottomCenter">
            <img src={historySvg} alt="history" />
          </Dropdown>
        </span>
        <span className="favourite-img">
          <img src={favoriteSvg} alt="favourite" />
        </span>
        <span className="usr-img">
          <img src={usrPng} alt="usr" />
        </span>
      </span>
    </div>
  );
};

export const NavbarMobile = () => {
  return <span className="navbar-web-logo">{<img src={Logo} />}</span>;
};

const connector = connect(
  (state: RootState) => ({
    usrInfo: usrInfoSelector(state),
    watchHistory: watchHistorySelector(state),
    usrSource: usrSourceSelector(state),
  }),
  {
    setCurrentSource: usrActions.setCurrentSource,
  },
);

type ReduxProps = ConnectedProps<typeof connector>;
// export default connector(ToolManager);
export const NavbarWeb = connector(Web);
