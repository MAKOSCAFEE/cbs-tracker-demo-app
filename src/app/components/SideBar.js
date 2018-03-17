import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import Sidebar from 'd2-ui/lib/sidebar/Sidebar.component';

let currentSection;
const sections = [
    { key: 's1', label: 'Section 1' },
    { key: 's2', label: 'Section 2' },
    { key: 's3', label: 'Section 3' },
    { key: 's4', label: 'Section 4' }
];

function changeSectionHandler(key, searchText) {
    currentSection = key;
}

const icons = ['fingerprint', 'alarm', '', 'face'];
currentSection = sections[0].key;

export default class SidebarComponent extends Component {
    render() {
        return (
            <div className="leftBar">
                <Sidebar
                    sections={sections.map(({ key, label }, i) => ({
                        key,
                        label,
                        icon: <FontIcon className="material-icons">{icons[i]}</FontIcon>
                    }))}
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
