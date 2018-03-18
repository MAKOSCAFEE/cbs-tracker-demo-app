import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import ProgramSelect from './components/ProgramSelect';
import ProgramStageSelect from './components/ProgramStageSelect';
import OrgUnitContainer from './containers/OrgUnitSelection';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import SvgIcon from 'd2-ui/lib/svg-icon/SvgIcon';
import './index.css';

import { fromPrograms } from '../actions';

class SidebarComponent extends Component {
    constructor(props, context) {
        super(props, context);
        const { store } = this.context;
        store.dispatch(fromPrograms.loadPrograms());
    }

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

    render() {
        const { form } = this.props;
        const disableSubmit =
            (form && form.program && form.programStages && form.orgUnits) === undefined;
        return (
            <div className="leftBar">
                <div className="title-wrapper">
                    <span className="title">Tracker/Event Report Demo</span>
                </div>
                <ProgramSelect
                    programs={this.props.programs}
                    getSelectedProgram={this.getSelectedProgram}
                />
                <ProgramStageSelect />
                <div className="orgUnitSelect">
                    <div>Select OrgUnits</div>
                    <IconButton
                        onClick={this.toggleDialog}
                        tooltip="Edit"
                        tooltipPosition="top-center"
                        className="button"
                    >
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
                <RaisedButton
                    label="Update Data"
                    primary={true}
                    fullWidth={true}
                    disabled={disableSubmit}
                />
            </div>
        );
    }
}

SidebarComponent.propTypes = {
    baseUrl: PropTypes.string,
    programs: PropTypes.array,
    form: PropTypes.object
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

export default connect(mapStateToProps)(SidebarComponent);
