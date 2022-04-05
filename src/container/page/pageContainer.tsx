import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

interface Props {
    loading: boolean;
}

export class PageContainer extends React.PureComponent<Props, unknown> {
    render() {
        const { loading } = this.props;
        return (
            <>
                {loading && <CircularProgress size={14} />}
            </>
        )
    }
}
