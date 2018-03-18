import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramStageSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { formSet } from '../../actions/form';
import { loadProgramStages } from '../../actions/programs';

import { connect } from 'react-redux';

class ProgramStageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._handleOnchange = this._handleOnchange.bind(this);
    }

    render() {
        const { form, programStages } = this.props;

        const loading =
            programStages.constructor === Object && Object.keys(programStages).length === 0;
        return (
            <div className="programStageSelect">
                <div>Select Program Stage</div>
                <SelectField
                    items={programStages && programStages[form.program]}
                    value={this.state.selected}
                    onChange={this._handleOnchange}
                    loading={loading}
                    multiple
                />
            </div>
        );
    }

    _handleOnchange(items) {
        const { formSet, form } = this.props;
        this.setState(state => ({ selected: items }));
        formSet({ ...form, programStages: items });
    }
}

ProgramStageSelect.propTypes = {
    programStages: PropTypes.object,
    form: PropTypes.object,
    formSet: PropTypes.func,
    loadProgramStages: PropTypes.func
};

ProgramStageSelect.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object
};

const mapStateToProps = state => ({
    form: state.form,
    programStages: state.programStages
});

export default connect(mapStateToProps, { formSet, loadProgramStages })(ProgramStageSelect);
