import { observable } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import { Store } from './store';
import Amplify from 'aws-amplify';
import appConfig from "api/appConfig";

export default class AppStore {
  @observable stores = new Map<string, any>();
  @observable routingStore: RouterStore;
  @observable session;

  constructor(routingStore: RouterStore, session) {
    this.routingStore = routingStore;
    this.session= session;
    Amplify.configure(appConfig.AmplifyConfig);
  }

  createCacheKey = (prefix: string, params: any = {}): string => `${prefix}${JSON.stringify(params)}`;

  createStore<T extends Store>(key: string, Type: (new (appStore: AppStore) => Store)): T {
    let store = this.stores.get(key);
    if(!store) {
      store = new Type(this);
      this.stores.set(key, store);
      store.init();
    }
    return store;
  }

  getStore<T extends Store>(key: string): T {
    return this.stores.get(key);
  }

  navigateTo(path: string): void {
    this.routingStore.push(path);
    window.dispatchEvent( new Event('routeChange') );
  }
}
