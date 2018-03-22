import * as types from '../constants/actionTypes';

const defaultState = {
    loading: false,
    analytics: null,
    linelist: {}
};
const reports = (state = defaultState, action) => {
    switch (action.type) {
        case types.REPORT_SAVE_NEW_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.config
            };
        case types.REPORT_SAVE_NEW:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};

export default reports;
