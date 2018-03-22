import * as types from '../constants/actionTypes';

export const loadReport = id => ({
    type: types.REPORT_LOAD,
    id
});

export const saveReport = config => ({
    type: types.REPORT_SAVE,
    config
});

export const saveNewReport = () => ({
    type: types.REPORT_SAVE_NEW
});

export const saveNewReportSuccess = config => ({
    type: types.REPORT_SAVE_NEW_SUCCESS,
    config
});

export const saveNewReportError = config => ({
    type: types.REPORT_SAVE_NEW_ERROR,
    config
});
