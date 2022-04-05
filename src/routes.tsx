import React, { ReactElement } from "react";
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route, Switch } from 'react-router-dom';
import { PageContainer } from "container/page/pageContainer";
import { ErrorBoundry } from "container/util/errorBoundry";

export const routingStore = new RouterStore();

const dbPage = React.lazy(() => import('./pages/dashboard/dashboard'));
const loginPage = React.lazy(() => import('./pages/login/login'));
const nodesPage = React.lazy(() => import('./pages/node/nodes'));

const routes = (): ReactElement => {
  const browserHistory = createBrowserHistory();
  const history = syncHistoryWithStore(browserHistory, routingStore);

  return (
    <Router history={history}>
      <React.Suspense fallback={<PageContainer loading />}>
        <ErrorBoundry>
          <Switch>
            <Route exact path="/" component={dbPage} />
            <Route exact path="/login" component={loginPage} />
            <Route exact path="/nodes" component={nodesPage} />
          </Switch>
        </ErrorBoundry>
      </React.Suspense>
    </Router>
  );
};

export default routes;