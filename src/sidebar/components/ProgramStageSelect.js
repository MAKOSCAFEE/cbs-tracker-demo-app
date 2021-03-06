import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProgramStageSelect.css';
import SelectField from 'd2-ui/lib/select-field/SelectField';
import { setFormProgramStages } from '../../actions/form';
import { loadProgramStages } from '../../actions/programs';

import { connect } from 'react-redux';

class ProgramStageSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._handleOnchange = this._handleOnchange.bind(this);
  }

  render() {
    const { form, programStages } = this.props;

    const items = programStages && programStages[form.program];
    const selectedStages =
      (form &&
        form.programStages &&
        items &&
        items
          .filter(({ id }) => form.programStages.includes(id))
          .map(item => item.name)
          .join(',')) ||
      'None is selected';
    return (
      <div className="programStageSelect">
        <div>Program Stage ({selectedStages})</div>
        <SelectField
          items={items}
          value={form.programStages}
          onChange={this._handleOnchange}
          loading={!items}
          multiple
        />
      </div>
    );
  }

  _handleOnchange(items) {
    const { setFormProgramStages } = this.props;
    this.setState(state => ({ selected: items }));
    setFormProgramStages(items);
  }
}

ProgramStageSelect.propTypes = {
  programStages: PropTypes.object,
  form: PropTypes.object,
  setFormProgramStages: PropTypes.func,
  loadProgramStages: PropTypes.func
};

ProgramStageSelect.contextTypes = {
  d2: PropTypes.object,
  store: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form,
  programStages: state.programStages
});

export default connect(
  mapStateToProps,
  { setFormProgramStages, loadProgramStages }
)(ProgramStageSelect);
