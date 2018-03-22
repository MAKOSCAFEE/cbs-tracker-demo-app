import React, { Component } from 'react';
import './page.css';
import { connect } from 'react-redux';
import VisualizationPlaceholder from './components/VisualizationPlaceholder';
import MultiGridLineList from './components/MultiGridLineList';

class TrackerReport extends Component {
    render() {
        const { data, linelist } = this.props;

        return (
            <div className="page">
                {!data && <VisualizationPlaceholder />}
                {data && <MultiGridLineList data={linelist} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.reports.analytics,
    linelist: state.reports.linelist,
    isLoading: state.reports.loading
});

export default connect(mapStateToProps)(TrackerReport);
