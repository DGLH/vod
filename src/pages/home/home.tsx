import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/app/rootReducer';

import { Navbar, BodyContainer, Show, ClassList } from 'src/components';
import { usrInfoSelector, usrSourceSelector, watchHistorySelector, epicActions as usrEpics } from 'src/redux/usr';
import { classSelector, epicActions as movieEpics, videosSelector } from 'src/redux/movie';
import { formatUrl, Params } from 'src/utils/urlUtiles';

const Container: React.FC<ReduxProps> = ({
  usrSource,
  watchHistory,
  setCurrentSource,
  loadClassList,
  loadClassDetails,
  videos,
  clearClassDetails,
  classes,
}) => {
  const [showPage, setShowPage] = useState(videos.attr.page);

  useEffect(() => {
    loadClassList(usrSource.currentSource.address);
    loadClassDetails(usrSource.currentSource.address);
  }, [loadClassList, loadClassDetails, usrSource.currentSource.address]);

  const fetchSourceDetails = useCallback(
    (params: Partial<Params> = {}) => {
      const paramsString = formatUrl(params);
      loadClassDetails(usrSource.currentSource.address + paramsString);
    },
    [loadClassDetails, usrSource.currentSource.address],
  );

  const showFetchSourceDetails = useCallback(
    (page: number) => {
      setShowPage(page);
      clearClassDetails();
      fetchSourceDetails({ pg: `${page}` });
    },
    [clearClassDetails, fetchSourceDetails],
  );

  return (
    <div>
      <Navbar usrSource={usrSource} watchHistory={watchHistory} setCurrentSource={setCurrentSource} />
      <BodyContainer>
        <ClassList classes={classes} />
        <Show videos={videos} fetchSourceDetails={showFetchSourceDetails} page={showPage} />
      </BodyContainer>
    </div>
  );
};

const connector = connect(
  (state: RootState) => ({
    usrInfo: usrInfoSelector(state),
    watchHistory: watchHistorySelector(state),
    usrSource: usrSourceSelector(state),
    videos: videosSelector(state),
    classes: classSelector(state),
  }),
  {
    setCurrentSource: usrEpics.setCurrentSource,
    loadClassList: movieEpics.loadClassList,
    loadClassDetails: movieEpics.loadClassDetails,
    clearClassDetails: movieEpics.clearClassDetails,
  },
);

type ReduxProps = ConnectedProps<typeof connector>;
export const Home = connector(Container);
