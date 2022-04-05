import { Store } from "container/app/store";
import { action, observable } from "mobx";
import { Auth } from 'aws-amplify';
import AppStore from "container/app/appStore";

export class LoginStore implements Store {
  @observable email!: string;
  @observable password!: string;
  @observable appStore: AppStore;

  constructor(appStore) {
    this.appStore = appStore;
  }

  init(): void { }

  load() {
    Auth.currentSession()
      .then(() => {
        this.appStore.navigateTo('/nodes');
      })
      .catch(() => {
        // do nothing as user is not logged
      });
  }

  @action
  setEmail(email) {
    this.email = email;
  }

  @action
  setPassword(pwd) {
    this.password = pwd;
  }

  @action
  handleSubmit(event) {
    event.preventDefault();
    Auth.signIn(this.toUsername(this.email), this.password)
      .then(() => {
        this.appStore.navigateTo('/nodes');
      })
      .catch((e) => {
        console.log(`login failse: ${e}`);
      });
  }

  toUsername(email) {
    return email.replace('@', '-at-');
  }
}