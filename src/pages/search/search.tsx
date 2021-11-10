import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'src/app/rootReducer';
import { BodyContainer, Navbar, SearchList } from 'src/components';

export const Web: React.FC<ReduxProps> = () => {
  return (
    <React.Fragment>
      <Navbar needSource={false} />
      <BodyContainer>
        <SearchList />
      </BodyContainer>
    </React.Fragment>
  );
};

const connector = connect((state: RootState) => ({}), {});

type ReduxProps = ConnectedProps<typeof connector>;
export const WebSerch = connector(Web);
