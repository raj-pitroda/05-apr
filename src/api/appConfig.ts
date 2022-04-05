import { Auth } from 'aws-amplify';

const AMPLIFY_CONFIG = {
    Auth: {
        region: 'us-east-2', // e.g. us-east-2
        userPoolId: 'us-east-2_I8OyOIH1Y', // KraemerPowerApp Pool Id
        userPoolWebClientId: '4o3rsp021d8vb7ijkci8ov02k1', // KraemerPowerApp App client id
    },
    API: {
      endpoints: [
        {
          name: "APIGatewayAPI",
          endpoint: 'https://lu6dcb9gcg.execute-api.us-east-2.amazonaws.com/dev',
          custom_header: async () => { 
            return { Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
          }
        }
      ]
    },
    url: {
        site: 'https://dev.d25klppo77i3po.amplifyapp.com/'
    }
}

const appConfig = {
    AmplifyConfig: AMPLIFY_CONFIG,
};

export default appConfig;