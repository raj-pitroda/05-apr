import { Store } from "container/app/store";
import { API } from 'aws-amplify';
import { action, observable } from "mobx";

export class NodesStore implements Store {
  @observable appNodes: any[] = [];
  @observable loading = true;
  @observable selectedDate = new Date();

  init(): void { }

  @action
  load(userId) {
    const params = {
      queryStringParameters: {
        userid: userId,
        firstTimeCall: '1'
      }
    };
    API.get('APIGatewayAPI', "/getnodehistory/2021-06-13", params)
      .then((response) => {
        this.appNodes = JSON.parse(response.body).data;
      })
      .catch((e) => {
        console.log(`login failse: ${e}`);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @action
  handleDateChange(date) {

  }
}