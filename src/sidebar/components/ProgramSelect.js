import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';

const items = [
    {
        id: 'cat',
        name: 'Cat'
    },
    {
        id: 'mouse',
        name: 'Mouse'
    },
    {
        id: 'dog',
        name: 'Dog'
    }
];

class ProgramSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: items[0].id
        };

        this._handleOnchange = this._handleOnchange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const selected = nextProps.programs ? nextProps.programs[0].id : null;
        this.setState(state => ({ ...state, programs: nextProps.programs, selected }));
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
        console.log(this.state);
        this.setState(state => ({ selected: item.id }));
    }
}

ProgramSelect.propTypes = {
    baseUrl: PropTypes.string,
    programs: PropTypes.array
};

export default ProgramSelect;
