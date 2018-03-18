import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { connect } from 'react-redux';
import { formSet } from '../../actions/form';
import { loadPrograms, loadProgramStages } from '../../actions/programs';

class ProgramSelect extends Component {
    constructor(props) {
        super(props);
        this._handleOnchange = this._handleOnchange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { programs, form, formSet, loadProgramStages } = nextProps;
        if (!form.program && programs) {
            formSet({ program: programs[0].id });
            loadProgramStages(programs[0].id);
        }
    }

    render() {
        const { programs, form } = this.props;
        const selected = form.program;

        return (
            <div className="programSelect">
                <div>Select Program</div>
                <SelectField
                    items={programs}
                    value={selected}
                    onChange={this._handleOnchange}
                    loading={!programs}
                />
            </div>
        );
    }

    _handleOnchange(program) {
        const { formSet, loadProgramStages } = this.props;
        formSet({ program: program.id });
        loadProgramStages(program.id);
    }
}

ProgramSelect.propTypes = {
    programs: PropTypes.array,
    form: PropTypes.object,
    loadPrograms: PropTypes.func,
    formSet: PropTypes.func,
    loadProgramStages: PropTypes.func
};

ProgramSelect.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object
};

const mapStateToProps = state => ({
    form: state.form,
    programs: state.programs
});

export default connect(mapStateToProps, { loadPrograms, formSet, loadProgramStages })(
    ProgramSelect
);
