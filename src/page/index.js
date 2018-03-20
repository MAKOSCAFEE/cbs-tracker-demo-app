import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';
import LineList from './components/LineList';
import VisualizationPlaceholder from './components/VisualizationPlaceholder';

class TrackerReport extends Component {
    render() {
        const { data } = this.props;

        return (
            <div className="page">
                {!data && <VisualizationPlaceholder />}
                {data && <LineList data={data} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.reports.analytics,
    isLoading: state.reports.loading
});

export default connect(mapStateToProps)(TrackerReport);
