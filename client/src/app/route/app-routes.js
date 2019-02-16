import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import config from '../../config/config';

import App from '../app-component';

const { basePath } = config.path;

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} component={App} path={`${basePath}/groups`}/>
          <Route exact={true} component={App} path={`${basePath}/group/:groupId/gallery`}/>
          <Route exact={true} component={App} path={`${basePath}/group/:groupId/gallery/:photoId/overview`}/>
          <Route render={() => <Redirect to={{
            pathname: `${basePath}/groups`,
          }}
          />}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRoutes;
