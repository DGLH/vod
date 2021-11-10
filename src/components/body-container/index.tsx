import React from 'react';

import './index.css';

export const ContainerWeb: React.FC = ({ children }) => {
  return <div className="body-container body-web-container">{children}</div>;
};

export const ContainerMobile: React.FC = ({ children }) => {
  return <div className="body-container body-mobile-container">{children}</div>;
};
