import React, { Component } from 'react';
import MultiGridLineList from '../components/MultiGridLineList';
// import SelectField from 'd2-ui/lib/select-field/SelectField';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';
import EpiCurve from '../components/Epicurve';
import LineSeries from '../components/LineSeries';
import { connect } from 'react-redux';
import './VisualizationContainer.css';

const loadingStatusMask = {
    left: '45%',
    position: 'absolute',
    top: '45%'
};

/*
const visualizationTypes = [
    {
        id: 'lineList',
        name: 'Line Listing'
    },
    { id: 'epiCurve', name: 'EpiCurve' },
    { id: 'lineSeries', name: 'Line Series' }
];
*/

class VisualizationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'lineList'
        };
        this._handleOnchange = this._handleOnchange.bind(this);
    }
    render() {
        const { isLoading, linelist } = this.props;
        const { selected } = this.state;
        if (isLoading) {
            return <LoadingMask style={loadingStatusMask} />;
        }

        return (
            <div>
                {selected === 'lineList' && <MultiGridLineList data={linelist} />}
                {selected === 'epiCurve' && <EpiCurve />}
                {selected === 'lineSeries' && <LineSeries />}
            </div>
        );
    }

    _handleOnchange(visualizationType) {
        this.setState(state => ({ selected: visualizationType.id }));
    }
}

const mapStateToProps = state => ({
    linelist: state.reports.linelist,
    isLoading: state.reports.loading
});

export default connect(mapStateToProps)(VisualizationContainer);
