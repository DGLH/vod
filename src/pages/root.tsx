import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES } from 'src/utils/constant';
import { Home } from './home';
import { WebSerch } from './search';

const PrimaryLayout: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SEARCH} component={WebSerch} />
      <Redirect to={ROUTES.HOME} />
    </Switch>
  </HashRouter>
);

export default PrimaryLayout;
