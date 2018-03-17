import React, { Component } from 'react';
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

export default class ProgramSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: items[0].id
        };

        this._handleOnchange = this._handleOnchange.bind(this);
    }

    render() {
        return (
            <div className="programSelect">
                <div>Select Program</div>
                <SelectField
                    items={items}
                    value={this.state.selected}
                    onChange={this._handleOnchange}
                />
            </div>
        );
    }

    _handleOnchange(item) {
        this.setState(state => ({ selected: item.id }));
    }
}
