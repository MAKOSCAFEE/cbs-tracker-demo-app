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
import './index.css';

import { saveNewReport } from '../actions/reports';
import { setPeriodType, setPeriod, setStartDate, setEndDate } from '../actions/form';
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
    state = {
        orgUnitDialog: {
            open: false
        },
        snackbar: {
            open: false,
            message: ''
        }
    };

    toggleDialog = () => {
        this.setState({
            orgUnitDialog: {
                open: !this.state.orgUnitDialog.open
            }
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
        const { form, saveNewReport } = this.props;
        saveNewReport(form);
    };

    render() {
        const { form, setPeriod, setStartDate, setEndDate } = this.props;
        const periodError = 'Period is Required';
        const { period, startDate, endDate } = form;
        const periodIsSelected =
            period &&
            ((period.id === 'START_END_DATES' && startDate && endDate) ||
                period.id !== 'START_END_DATES');
        const enableSubmit =
            form && form.program && form.programStages && form.orgUnits && periodIsSelected;
        return (
            <div className="leftBar">
                <div className="title-wrapper">
                    <span className="title">Tracker/Event Report Demo</span>
                </div>
                <ProgramSelect />
                <ProgramStageSelect />
                <div className="orgUnitSelect">
                    <div>Select OrgUnits</div>
                    <IconButton onClick={this.toggleDialog} className="button">
                        <SvgIcon icon="Create" />
                    </IconButton>
                </div>
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
export default connect(mapStateToProps, {
    saveNewReport,
    setPeriodType,
    setPeriod,
    setStartDate,
    setEndDate
})(SidebarComponent);
