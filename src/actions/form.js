import * as types from '../constants/actionTypes';

export const formSet = payload => ({
    type: types.FORM_SET,
    payload
});

export const formToggleOrgUnit = orgUnit => ({
    type: types.TOGGLE_FORM_ORGUNIT,
    orgUnit
});
