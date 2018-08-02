import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import i18next from 'i18next';
import Button from 'd2-ui/lib/button/Button';
import { formToggleOrgUnit } from '../../actions/form';
import SelectionGroupEditor from '../components/SelectionGroupEditor';

const styles = {
  content: {
    width: 900
  },
  title: {
    padding: '16px 24px 0',
    fontSize: 16,
    fontWeight: 'bold'
  },
  body: {
    padding: '0 24px',
    minHeight: 300
  }
};

class DataElementGroupEditor extends Component {
  state = {
    selected: []
  };
  render() {
    const { open, onRequestClose, onDataFilterSelect } = this.props;
    const title = 'Select DataElements/attributes';
    return (
      <Dialog
        title={title}
        contentStyle={styles.content}
        bodyStyle={styles.body}
        titleStyle={styles.title}
        open={open}
        actions={[
          <Button color="primary" onClick={() => onRequestClose()} selector="cancel">
            {i18next.t('Close')}
          </Button>,
          <Button color="primary" onClick={() => onDataFilterSelect()} selector="update">
            {i18next.t('Add Data Filters ')}
          </Button>
        ]}
      >
        <SelectionGroupEditor />
      </Dialog>
    );
  }
}

DataElementGroupEditor.propTypes = {
  form: PropTypes.object,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onOrgUnitSelect: PropTypes.func,
  formToggleOrgUnit: PropTypes.func
};

DataElementGroupEditor.contextTypes = {
  d2: PropTypes.object,
  store: PropTypes.object
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(
  mapStateToProps,
  { formToggleOrgUnit },
  null,
  {
    withRef: true
  }
)(DataElementGroupEditor);
