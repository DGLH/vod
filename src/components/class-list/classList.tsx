import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

interface Props {
  classes: Array<{ id: number; name: string }>;
}

export const ClassListWeb: React.FC<Props> = ({ classes }) => {
  return (
    <div className="classlist-container-web">
      {classes?.length ? (
        classes.map((cl) => (
          <span className="classlist-web-item" key={cl.id}>
            <Link to={`/home/?t=${cl.id}`}>{cl.name}</Link>
          </span>
        ))
      ) : (
        <div className="classlist-web-loading">
          <span>精彩即将呈现！</span>
        </div>
      )}
    </div>
  );
};

export const ClassListMobile: React.FC<Props> = ({ classes }) => {
  return (
    <div className="classlist-container-mobile">
      {classes.length ? (
        classes.map((cl) => <span key={cl.id}>{cl.name}</span>)
      ) : (
        <div className="classlist-mobile-loading loading"></div>
      )}
    </div>
  );
};
