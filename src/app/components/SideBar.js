import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';

let currentSection;
const sections = [
    { key: 'tracker_reports', label: 'Generate Tracker Reports' },
    { key: 'events_reports', label: 'Generate Event Reports' }
];

function changeSectionHandler(key, searchText) {
    currentSection = key;
}

currentSection = sections[0].key;

export default class SidebarComponent extends Component {
    render() {
        return (
            <div className="leftBar">
                <Sidebar
                    sections={sections}
                    onChangeSection={changeSectionHandler}
                    currentSection={currentSection}
                />
            </div>
        );
    }
}

SidebarComponent.propTypes = {
    currentSection: PropTypes.string,
    searchText: PropTypes.string
};
changeSectionHandler(sections[0].key);
