import React, { Component } from 'react';
import MultiGridLineList from '../components/MultiGridLineList';
import LoadingMask from 'd2-ui/lib/loading-mask/LoadingMask.component';
import { connect } from 'react-redux';
import './VisualizationContainer.css';

const loadingStatusMask = {
  left: '45%',
  position: 'absolute',
  top: '45%'
};

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
    if (isLoading) {
      return <LoadingMask style={loadingStatusMask} />;
    }

    return <MultiGridLineList data={linelist} />;
  }

  _handleOnchange(visualizationType) {
    this.setState({ selected: visualizationType.id });
  }
}

const mapStateToProps = state => ({
  linelist: state.reports.linelist,
  isLoading: state.reports.loading
});

export default connect(mapStateToProps)(VisualizationContainer);
