import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import i18next from 'i18next';
import Button from 'd2-ui/lib/button/Button';
import { formToggleOrgUnit } from '../../actions/form';
import OrgUnitTreeComponent from '../components/OrgUnitTreeSelection';

const styles = {
    content: {
        minWidth: 400,
        maxWidth: 600
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

class OrgUnitContainer extends Component {
    state = {
        selected: []
    };
    render() {
        const { open, onRequestClose, onOrgUnitSelect, formToggleOrgUnit, form } = this.props;
        const title = 'Select OrgUnits';
        const { orgUnits } = form;
        return (
            <Dialog
                title={title}
                contentStyle={styles.content}
                bodyStyle={styles.body}
                titleStyle={styles.title}
                open={open}
                actions={[
                    <Button color="primary" onClick={() => onRequestClose()} selector="cancel">
                        {i18next.t('Cancel')}
                    </Button>,
                    <Button color="primary" onClick={() => onOrgUnitSelect()} selector="update">
                        {i18next.t('Add OrgUnits')}
                    </Button>
                ]}
            >
                <OrgUnitTreeComponent selected={orgUnits || []} onClick={formToggleOrgUnit} />
            </Dialog>
        );
    }
}

OrgUnitContainer.propTypes = {
    form: PropTypes.object,
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onOrgUnitSelect: PropTypes.func,
    formToggleOrgUnit: PropTypes.func
};

OrgUnitContainer.contextTypes = {
    d2: PropTypes.object,
    store: PropTypes.object
};

const mapStateToProps = state => ({
    form: state.form
});

export default connect(mapStateToProps, { formToggleOrgUnit }, null, {
    withRef: true
})(OrgUnitContainer);
