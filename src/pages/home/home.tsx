import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/app/rootReducer';

import { Navbar, BodyContainer, Show, ClassList } from 'src/components';
import { usrSourceSelector, epicActions as usrEpics } from 'src/redux/usr';
import { classSelector, epicActions as movieEpics, videosSelector } from 'src/redux/movie';
import { formatUrl, Params } from 'src/utils/urlUtiles';

const WebContainer: React.FC<ReduxProps> = ({
  usrSource,
  loadClassList,
  loadClassDetails,
  videos,
  clearClassDetails,
  classes,
  router,
}) => {
  const [showPage, setShowPage] = useState(videos.attr.page);
  useEffect(() => {
    setShowPage(videos.attr.page);
  }, [videos.attr.page]);

  const clearAndFetchDetails = useCallback(
    (address: string) => {
      clearClassDetails();
      loadClassDetails(address);
    },
    [clearClassDetails, loadClassDetails],
  );

  useEffect(() => {
    loadClassList(usrSource.currentSource.address);
    clearAndFetchDetails(usrSource.currentSource.address + formatUrl(router.location.query || {}));
  }, [clearAndFetchDetails, loadClassList, router.location.query, usrSource.currentSource.address]);

  const fetchSourceDetails = useCallback(
    (params: Partial<Params> = {}) => {
      const paramsString = formatUrl(params);
      clearAndFetchDetails(usrSource.currentSource.address + paramsString);
    },
    [clearAndFetchDetails, usrSource.currentSource.address],
  );

  const showFetchSourceDetails = useCallback(
    (page: number) => {
      setShowPage(page);
      fetchSourceDetails({ pg: `${page}` });
    },
    [fetchSourceDetails],
  );

  return (
    <React.Fragment>
      <Navbar />
      <BodyContainer>
        <ClassList classes={classes} />
        <Show videos={videos} fetchSourceDetails={showFetchSourceDetails} page={showPage} />
      </BodyContainer>
    </React.Fragment>
  );
};

const connector = connect(
  (state: RootState) => ({
    usrSource: usrSourceSelector(state),
    videos: videosSelector(state),
    classes: classSelector(state),
    router: state.router,
  }),
  {
    setCurrentSource: usrEpics.setCurrentSource,
    loadClassList: movieEpics.loadClassList,
    loadClassDetails: movieEpics.loadClassDetails,
    clearClassDetails: movieEpics.clearClassDetails,
  },
);

type ReduxProps = ConnectedProps<typeof connector>;
export const Home = connector(WebContainer);
