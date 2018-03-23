import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';
import VisualizationPlaceholder from './components/VisualizationPlaceholder';
import VisualizationContainer from './containers/VisualizationContainer';

class TrackerReport extends Component {
    render() {
        const { data } = this.props;

        return (
            <div className="page">
                {!data && <VisualizationPlaceholder />}
                {data && <VisualizationContainer />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.reports.analytics
});

export default connect(mapStateToProps)(TrackerReport);
