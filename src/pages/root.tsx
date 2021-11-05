import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from './home';

const ROUTES = {
  HOME: '/home',
};

const PrimaryLayout: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Redirect to={ROUTES.HOME} />
    </Switch>
  </HashRouter>
);

export default PrimaryLayout;
