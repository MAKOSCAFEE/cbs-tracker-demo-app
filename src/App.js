import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'dhis2-i18n';

import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import './App.css';

import SidebarComponent from './sidebar';
import TrackerReport from './reports';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);

class App extends Component {
    getChildContext() {
        return {
            baseUrl: this.props.baseUrl,
            i18n
        };
    }

    render() {
        return (
            <div className="app-wrapper">
                <HeaderBar />
                <div className="box">
                    <SidebarComponent />
                    <TrackerReport />
                </div>
            </div>
        );
    }
}
App.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object
};

App.childContextTypes = {
    baseUrl: PropTypes.string,
    i18n: PropTypes.object,
    programs: PropTypes.array
};

export default App;
