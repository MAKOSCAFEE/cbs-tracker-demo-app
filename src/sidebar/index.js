import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProgramSelect from './components/ProgramSelect';
import './index.css';

import { fromPrograms } from '../actions';

class SidebarComponent extends Component {
    constructor(props, context) {
        super(props, context);
        const { store } = this.context;
        store.dispatch(fromPrograms.loadPrograms());
    }

    render() {
        return (
            <div className="leftBar">
                <div className="title-wrapper">
                    <span className="title">Tracker/Event Report Demo</span>
                </div>
                <ProgramSelect programs={this.props.programs} />
            </div>
        );
    }
}

SidebarComponent.propTypes = {
    baseUrl: PropTypes.string,
    programs: PropTypes.array
};

SidebarComponent.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object,
    programs: PropTypes.array
};

const mapStateToProps = state => ({
    programs: state.programs
});

export default connect(mapStateToProps)(SidebarComponent);
