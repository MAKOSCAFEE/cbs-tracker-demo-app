import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { saveDataStore } from '../../actions/dataStore';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export class DataStoreSave extends React.Component {
  state = {
    open: false,
    name: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = () => {
    const { saveDataStore, form } = this.props;
    const { name } = this.state;
    saveDataStore({ ...form, name });
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    const { form } = nextProps;
    this.setState({ name: form.name });
  }

  render() {
    const Buttonstyle = {
      marginTop: 12
    };
    const actions = [
      <FlatButton primary={true} onClick={this.handleClose} label="Cancel" />,
      <FlatButton
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
        label="Submit"
        disabled={this.state.name === ''}
      />
    ];

    return (
      <div>
        <RaisedButton
          label="Save/Update Report"
          style={Buttonstyle}
          primary={true}
          fullWidth={true}
          onClick={this.handleOpen}
          disabled={this.props.disabled}
        />
        <Dialog
          title="Save Report"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Name of the report.
          <div>
            <TextField
              fullWidth={true}
              id="text-field-controlled"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DataStoreSave.propTypes = {
  form: PropTypes.object,
  saveDataStore: PropTypes.func
};

DataStoreSave.contextTypes = {
  d2: PropTypes.object,
  store: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(
  mapStateToProps,
  {
    saveDataStore
  }
)(DataStoreSave);
