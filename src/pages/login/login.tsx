import React from 'react';
import AppStore from 'container/app/appStore';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { LoginStore } from './loginStore';
import { Button, TextField, Grid, Paper, Typography, Link, } from "@material-ui/core";
import './login.scss';

interface Props {
  appStore?: AppStore;
}

@withRouter @inject('appStore') @observer
export default class Login extends React.PureComponent<Props, unknown> {
  @observable key = '';
  constructor(props) {
    super(props);
    this.createStore();
  }

  createStore() {
    const { appStore } = this.props;
    this.key = appStore!.createCacheKey('LOGIN');
    appStore?.createStore(this.key, LoginStore);
    this.store.load();
  }

  get store(): LoginStore {
    const { appStore } = this.props;
    return appStore!.getStore(this.key);
  }

  render() {
    return (<>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid container direction="column" justify="center" spacing={2} className="login-form">
            <Paper variant="elevation" elevation={2} className="login-background">
              <Grid item>
                <Typography component="h1" variant="h5">Sign in</Typography>
              </Grid>
              <Grid item>
                <form onSubmit={(e) => this.store.handleSubmit(e)}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        onChange={(event) => this.store.setEmail(event.target.value)}
                        required
                        autoFocus />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        onChange={(event) => this.store.setPassword(event.target.value)}
                        required />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" type="submit" className="button-block">Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid >
        </Grid >
      </Grid >
    </>);
  }
}
