import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgramSelect from './components/ProgramSelect';
import './index.css';
import { apiFetchPrograms } from '../api/programs';

export default class SidebarComponent extends Component {
    componentDidMount() {
        const models = apiFetchPrograms().then(value => value);
        console.log(models);
    }

    render() {
        return (
            <div className="leftBar">
                <div className="title-wrapper">
                    <span className="title">Tracker/Event Report Demo</span>
                </div>
                <ProgramSelect />
            </div>
        );
    }
}

SidebarComponent.propTypes = {
    currentSection: PropTypes.string,
    searchText: PropTypes.string
};
