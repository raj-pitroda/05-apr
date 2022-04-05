import { AppContainer } from 'container/app/appContainer';
import * as React from 'react';
import Routes from './routes';

export class App extends React.PureComponent<unknown, unknown> {
    render() {
        return (
            <AppContainer>
                <Routes />
            </AppContainer>
        );
    }
}

export default App;