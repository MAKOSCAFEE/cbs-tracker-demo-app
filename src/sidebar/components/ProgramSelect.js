import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { fromPrograms, fromForm } from '../../actions';

class ProgramSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._handleOnchange = this._handleOnchange.bind(this);
        this._getProgramStages = this._getProgramStages.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const selected = nextProps.programs ? nextProps.programs[0].id : null;
        const program = nextProps.programs && nextProps.programs[0];
        this._getProgramStages(program);
        this.setState(state => ({ ...state, programs: nextProps.programs, selected }));
    }

    _getProgramStages(program) {
        const { store } = this.context;
        store.dispatch(fromForm.formSet({ program: program.id }));
        store.dispatch(fromPrograms.loadProgramStages(program.id));
    }

    render() {
        return (
            <div className="programSelect">
                <div>Select Program</div>
                <SelectField
                    items={this.state.programs}
                    value={this.state.selected}
                    onChange={this._handleOnchange}
                />
            </div>
        );
    }

    _handleOnchange(item) {
        this._getProgramStages(item);
        this.setState(state => ({ selected: item.id }));
    }
}

ProgramSelect.propTypes = {
    baseUrl: PropTypes.string,
    programs: PropTypes.array
};

ProgramSelect.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object
};

export default ProgramSelect;
