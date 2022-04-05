import { CircularProgress } from '@material-ui/core';
import * as React from 'react';

interface State {
    error: string;
}

export class ErrorBoundry extends React.PureComponent<unknown, State> {
    constructor(props: State) {
        super(props);
        this.state = { error: '' };
    }

    static getDerivedStateFormError(error: Error): object {
        return { error: error.message };
    }

    render() {
        const { children } = this.props;
        const { error } = this.state;
        if (error) {
            return (
                <CircularProgress size={14} />
            );
        }
        return children;
    }
}