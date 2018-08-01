import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import Snackbar from 'material-ui/Snackbar';
import ProgramSelect from './components/ProgramSelect';
import ProgramStageSelect from './components/ProgramStageSelect';
import OrgUnitContainer from './containers/OrgUnitSelection';
import RelativePeriodSelect from './components/RelativePeriodSelect';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'd2-ui/lib/svg-icon/SvgIcon';
import DatePicker from './components/DatePicker';
import SelectionGroupEditorContainer from './containers/DataElementGroupEditor';
import './index.css';

import { saveNewReport } from '../actions/reports';
import { setPeriodType, setPeriod, setStartDate, setEndDate } from '../actions/form';
import { loadAllOptionSet } from '../actions/optionSets';
import { EVENT_START_DATE, EVENT_END_DATE } from '../constants/periods';

const styles = {
  wrapper: {
    width: '100%',
    clear: 'both',
    height: 64
  },
  checkbox: {
    float: 'left',
    margin: '24px 0 0 12px',
    width: 180
  },
  font: {
    float: 'left',
    marginTop: -8
  },
  error: {
    marginTop: 10,
    color: 'red'
  }
};

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    const { loadAllOptionSet } = this.props;
    loadAllOptionSet();
  }

  state = {
    orgUnitDialog: {
      open: false
    },
    dataFilterDialog: {
      open: false
    },
    snackbar: {
      open: false,
      message: ''
    },
    sidebarClosed: false
  };

  toggleDialog = () => {
    this.setState({
      orgUnitDialog: {
        open: !this.state.orgUnitDialog.open
      }
    });
  };

  toggleDataFilterDialog = () => {
    this.setState({
      dataFilterDialog: {
        open: !this.state.dataFilterDialog.open
      }
    });
  };

  toggleSidebar = () => {
    this.setState({
      sidebarClosed: !this.state.sidebarClosed
    });
  };

  onOrgUnitSelect = () => {
    this.setState({
      snackbar: {
        open: true,
        message: `Selected OrgUnit`
      },
      orgUnitDialog: {
        open: !this.state.orgUnitDialog.open
      }
    });
  };

  onSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  };

  onSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  };

  generateReport = () => {
    const { saveNewReport } = this.props;
    saveNewReport();
  };

  render() {
    const { form, setPeriod, setStartDate, setEndDate } = this.props;
    const periodError = 'Period is Required';
    const { period, startDate, endDate, orgUnits, filters } = form;
    const orgUnitNames = orgUnits && orgUnits.map(orgUnit => orgUnit.displayName).join(',');
    const periodIsSelected =
      period && ((period.id === 'START_END_DATES' && startDate && endDate) || period.id !== 'START_END_DATES');
    const enableSubmit = form && form.program && form.programStages && form.orgUnits && periodIsSelected;
    return (
      <div className={'leftBarContainer ' + (this.state.sidebarClosed ? 'is-closed' : '')}>
        <button
          className={'sidebar-toggle ' + (this.state.sidebarClosed ? 'is-closed' : '')}
          onClick={this.toggleSidebar}
        >
          <SvgIcon icon="ChevronRight" className="icon" />
        </button>
        <div className={'leftBar ' + (this.state.sidebarClosed ? 'is-closed' : '')}>
          <div className="title-wrapper">
            <span className="title">CBS Line Listing</span>
          </div>
          <ProgramSelect />
          <ProgramStageSelect />
          {/* <SelectionGroupEditor /> */}
          <div className="selectionGroupSelect">
            <div>Data Filter ({(filters && filters.length && `${filters.length} selected`) || 'None is selected'})</div>
            <IconButton onClick={this.toggleDataFilterDialog} className="button">
              <SvgIcon icon="Create" />
            </IconButton>
          </div>
          <div className="orgUnitSelect">
            <div>Select OrgUnits ({orgUnitNames || 'None is selected'})</div>
            <IconButton onClick={this.toggleDialog} className="button">
              <SvgIcon icon="Create" />
            </IconButton>
          </div>
          <SelectionGroupEditorContainer
            open={this.state.dataFilterDialog.open}
            onRequestClose={this.toggleDataFilterDialog}
            onDataFilterSelect={this.toggleDataFilterDialog}
          />
          <OrgUnitContainer
            open={this.state.orgUnitDialog.open}
            onRequestClose={this.toggleDialog}
            onOrgUnitSelect={this.onOrgUnitSelect}
          />
          <Snackbar
            open={this.state.snackbar.open}
            message={this.state.snackbar.message}
            autoHideDuration={4000}
            onRequestClose={this.onSnackbarClose}
          />
          <RelativePeriodSelect
            period={period}
            onChange={setPeriod}
            style={styles.select}
            errorText={periodError}
            startEndDates={true}
          />
          {period &&
            period.id === 'START_END_DATES' && [
              <DatePicker
                key="startdate"
                label={i18next.t('Start date')}
                value={startDate}
                default={EVENT_START_DATE}
                onChange={setStartDate}
                style={styles.select}
              />,
              <DatePicker
                key="enddate"
                label={i18next.t('End date')}
                value={endDate}
                default={EVENT_END_DATE}
                onChange={setEndDate}
                style={styles.select}
              />
            ]}
          <RaisedButton
            label="Generate Report"
            onClick={this.generateReport}
            primary={true}
            fullWidth={true}
            disabled={!enableSubmit}
          />
        </div>
      </div>
    );
  }
}

SidebarComponent.propTypes = {
  baseUrl: PropTypes.string,
  programs: PropTypes.array,
  form: PropTypes.object,
  saveNewReport: PropTypes.func
};

SidebarComponent.contextTypes = {
  d2: PropTypes.object,
  store: PropTypes.object,
  programs: PropTypes.array
};

const mapStateToProps = state => ({
  programs: state.programs,
  form: state.form
});
export default connect(
  mapStateToProps,
  {
    saveNewReport,
    setPeriodType,
    setPeriod,
    setStartDate,
    loadAllOptionSet,
    setEndDate
  }
)(SidebarComponent);
