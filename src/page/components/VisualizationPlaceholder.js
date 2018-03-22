import React, { Component } from 'react';
import './VisualizationPlaceholder.css';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';
import { connect } from 'react-redux';

const loadingStatusMask = {
    left: '45%',
    position: 'absolute',
    top: '45%'
};

class VisualizationPlaceholder extends Component {
    render() {
        const { isLoading } = this.props;
        if (!isLoading) {
            return (
                <div className="placeholder">
                    <h3>No data To visualize</h3>
                </div>
            );
        }
        return (
            <div className="placeholder">
                <LoadingMask style={loadingStatusMask} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.reports.loading
});

export default connect(mapStateToProps)(VisualizationPlaceholder);
