import { Grid } from '@material-ui/core';
import AppStore from 'container/app/appStore';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

interface Props {
  appStore?: AppStore;
}

@withRouter @inject('appStore') @observer
export default class Dashboard extends React.PureComponent<Props, unknown> {
  /* Commented this code, if users needs to land on nodes page then uncomment this
  constructor(props) {
    super(props);
    Auth.currentSession()
      .then(() => {
        const { appStore } = this.props;
        appStore?.navigateTo('/nodes');
      })
      .catch(() => {
        // do nothing as user is not logged
      });
  }
  */

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '85vh' }}
      >
        <h1>Kraemer Power</h1>
        <h3>This is the new Kraemer Power App on AWS.</h3>

      </Grid>
    );
  }
}
