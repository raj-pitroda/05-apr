import AppStore from "container/app/appStore";
import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import Amplify, { Auth } from 'aws-amplify';
import appConfig from "api/appConfig";
import { configure } from 'mobx';
import App from "./app";
import { routingStore } from './routes';

const rootElement = document.getElementById("root");

/*

Amplify.configure(appConfig.AmplifyConfig);
configure({ enforceActions: 'observed' });

Auth.currentSession()
    .then(session => {
        const appStore = new AppStore(routingStore, session);
        ReactDOM.render(
            <Provider appStore={appStore}>
                <App />
            </Provider>
            , rootElement);

    })
    .catch(() => {
        ReactDOM.render(
            <Provider appStore={appStore}>
                <App />
            </Provider>
            , rootElement);
    });

*/

const appStore = new AppStore(routingStore, null);
const skeleton =
  <div className="kraemerui">
    <Provider appStore={appStore}>
      <App />
    </Provider>
  </div>;


ReactDOM.render(skeleton, rootElement);
