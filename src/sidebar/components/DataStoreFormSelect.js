import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DataStoreFormSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { connect } from 'react-redux';
import { selectDataStoreForm } from '../../actions/dataStore';

class DataStoreFormSelect extends Component {
  constructor(props) {
    super(props);
    this._handleOnchange = this._handleOnchange.bind(this);
  }

  render() {
    const { dataStore } = this.props;
    const selected = dataStore.selected;

    return (
      <div className="dataStoreSelect">
        <div>Saved Reports</div>
        <SelectField items={dataStore.keys} value={selected} onChange={this._handleOnchange} />
      </div>
    );
  }

  _handleOnchange(form) {
    const { selectDataStoreForm } = this.props;
    selectDataStoreForm(form);
  }
}

DataStoreFormSelect.propTypes = {
  form: PropTypes.object,
  selectDataStoreForm: PropTypes.func
};

DataStoreFormSelect.contextTypes = {
  d2: PropTypes.object,
  store: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form,
  dataStore: state.dataStore
});

export default connect(
  mapStateToProps,
  { selectDataStoreForm }
)(DataStoreFormSelect);
