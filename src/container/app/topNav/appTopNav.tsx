import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import AppStore from '../appStore';
import { Auth } from 'aws-amplify';
import './appTopNav.scss';

interface Props {
  appStore?: AppStore;
}

@inject('appStore') @observer
export default class AppTopNav extends React.PureComponent<Props, unknown> {
  @observable showLogin = true;
  @observable showLogout = false;

  @action
  componentDidMount() {
    const pathName = window.location.pathname;
    this.showLogin = (pathName === '/');
    this.showLogout = (pathName !== '/' && pathName !== '/login');
    window.addEventListener('routeChange', () => {
      const pathName = window.location.pathname;
      this.showLogin = (pathName === '/');
      this.showLogout = (pathName !== '/' && pathName !== '/login');
    });
  }

  @action
  handleLoginClick() {
    const { appStore } = this.props;
    appStore?.navigateTo('/login');
  }

  @action
  async handleLogoutClick() {
    await Auth.signOut();
    const { appStore } = this.props;
    appStore?.navigateTo('/');
  }

  @action
  handleHeaderClick() {
    const { appStore } = this.props;
    appStore?.navigateTo('/');
  }

  render() {
    return (<>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <OfflineBoltOutlinedIcon />
          </IconButton>
          <Typography variant="h6" className="kp--title">
            <Button color="inherit" onClick={() => this.handleHeaderClick()}>Kraemer Power</Button>
          </Typography>
          {this.showLogin && <Button color="inherit" onClick={() => this.handleLoginClick()}>Login</Button>}
          {this.showLogout && <Button color="inherit" onClick={() => this.handleLogoutClick()}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </>);
  }
}
