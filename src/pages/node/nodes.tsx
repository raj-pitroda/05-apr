import React, { Fragment } from 'react';
import AppStore from 'container/app/appStore';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { observable } from 'mobx';
import { NodesStore } from './nodesStore';
import { Box, Checkbox, FormControlLabel, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import './nodes.scss';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import GetAppIcon from '@material-ui/icons/GetApp';

interface Props {
  appStore?: AppStore;
}

@withRouter @inject('appStore') @observer
export default class NodesList extends React.PureComponent<Props, unknown> {

  appNodes!: { nodesList; nodeLength; nodesDate; };

  @observable key = '';
  constructor(props) {
    super(props);
    this.createStore();
  }

  createStore() {
    const { appStore } = this.props;
    this.key = appStore!.createCacheKey('LOGIN');
    appStore?.createStore(this.key, NodesStore);
  }

  get store(): NodesStore {
    const { appStore } = this.props;
    return appStore!.getStore(this.key);
  }

  componentDidMount() {
    Auth.currentSession()
      .then(res => {
        this.store.load(res.getAccessToken().payload['sub']);
      })
      .catch(() => {
        // redirect to login page as user is not logged
        const { appStore } = this.props;
        appStore?.navigateTo('/login');
      });
  }

  render() {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12} />
          <Grid item xs={6}>
            <Typography component="h1" variant="h5">Nodes History</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Node Date"
                  format="yyyy-MM-dd"
                  value={this.store.selectedDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={date => this.store.handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Show Only Favorites"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            {!this.store.loading && <Paper className="table-root">
              <TableContainer className="table-container">
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Ept</TableCell>
                      <TableCell>Voltage</TableCell>
                      <TableCell>Equipment</TableCell>
                      <TableCell>NodeType</TableCell>
                      <TableCell>Zone</TableCell>
                      <TableCell align='right'>Off Peak DA</TableCell>
                      <TableCell align='right'>Off Peak RT</TableCell>
                      <TableCell align='right'>Off Peak PNL</TableCell>
                      <TableCell align='right'>Off Peak Trend</TableCell>
                      <TableCell align='right'>On Peak DA</TableCell>
                      <TableCell align='right'>On Peak RT</TableCell>
                      <TableCell align='right'>On Peak pnl</TableCell>
                      <TableCell align='right'>On Peak Trend</TableCell>
                      <TableCell align='right'>Favorite</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.store.appNodes.map((row, idx) => (
                      <TableRow key={`${idx}-${row.PNODE_NAME}`}>
                        <TableCell component="th" scope="row">{row.PNODE_NAME}</TableCell>
                        <TableCell>{row.PNODE_DATE}</TableCell>
                        <TableCell>{row.VOLTAGE}</TableCell>
                        <TableCell>{row.EQUIPMENT}</TableCell>
                        <TableCell>{row.TYPE}</TableCell>
                        <TableCell>{row.ZONE}</TableCell>
                        <TableCell align='right'>{row.TOTAL_LMP_DA_OFF}</TableCell>
                        <TableCell align='right'>{row.TOTAL_LMP_RT_OFF}</TableCell>
                        <TableCell align='right'>{row.LMP_PNL_OFF}</TableCell>
                        <TableCell align='right'>{row.TREND_OFF}</TableCell>
                        <TableCell align='right'>{row.TOTAL_LMP_DA_ON}</TableCell>
                        <TableCell align='right'>{row.TOTAL_LMP_RT_ON}</TableCell>
                        <TableCell align='right'>{row.LMP_PNL_ON}</TableCell>
                        <TableCell align='right'>{row.TREND_ON}</TableCell>
                        <TableCell align='right'>{row.FAVORITE}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>}
          </Grid>
        </Grid >
      </>
    )
  }
}
