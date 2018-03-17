import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramStageSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { fromForm } from '../../actions';

import { connect } from 'react-redux';

class ProgramStageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this._handleOnchange = this._handleOnchange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { form, programStages } = nextProps;
        this.setState(state => ({ ...state, programStages: programStages[form.program] }));
    }

    render() {
        return (
            <div className="programStageSelect">
                <div>Select Program Stage</div>
                <SelectField
                    label="Select multiple programStages"
                    items={this.state.programStages}
                    value={this.state.selected}
                    onChange={this._handleOnchange}
                    loading={!this.state.programStages}
                    multiple
                />
            </div>
        );
    }

    _handleOnchange(items) {
        this.setState(state => ({ selected: items }));
        const { store } = this.context;
        store.dispatch(fromForm.formSet({ ...this.props.form, programStages: items }));
    }
}

ProgramStageSelect.propTypes = {
    programStages: PropTypes.object,
    form: PropTypes.object
};

ProgramStageSelect.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object
};

const mapStateToProps = state => ({
    form: state.form,
    programStages: state.programStages
});

export default connect(mapStateToProps)(ProgramStageSelect);
