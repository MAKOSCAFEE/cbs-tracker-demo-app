import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { connect } from 'react-redux';
import { setFormProgram } from '../../actions/form';
import { loadPrograms, loadProgramStages } from '../../actions/programs';

class ProgramSelect extends Component {
    constructor(props) {
        super(props);
        const { loadPrograms } = this.props;
        loadPrograms();
        this._handleOnchange = this._handleOnchange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { programs, form, setFormProgram, loadProgramStages } = nextProps;
        if (!form.program && programs) {
            setFormProgram(programs[0].id);
            loadProgramStages(programs[0].id);
        }
    }

    render() {
        const { programs, form } = this.props;
        const selected = form.program;

        return (
            <div className="programSelect">
                <div>Program</div>
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
        const { setFormProgram, loadProgramStages } = this.props;
        setFormProgram(program.id);
        loadProgramStages(program.id);
    }
}

ProgramSelect.propTypes = {
    programs: PropTypes.array,
    form: PropTypes.object,
    loadPrograms: PropTypes.func,
    setFormProgram: PropTypes.func,
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

export default connect(mapStateToProps, { loadPrograms, setFormProgram, loadProgramStages })(
    ProgramSelect
);
