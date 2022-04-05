import * as React from 'react';
import { inject, observer } from "mobx-react";
import AppStore from "./appStore";
import AppTopNav from './topNav/appTopNav';

interface Props {
  appStore?: AppStore;
}

@inject('appStore') @observer
export class AppContainer extends React.PureComponent<Props, unknown> {
  render(): React.ReactElement {
    const { appStore, children } = this.props;
    return (
      <div className='awsui'>
        <AppTopNav appStore={appStore} />
        {children}
      </div>
    );
  }

}
