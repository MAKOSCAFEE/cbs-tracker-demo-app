import * as types from '../constants/actionTypes';

const defaultState = {
    loading: false,
    analytics: null
};
const reports = (state = defaultState, action) => {
    switch (action.type) {
        case types.REPORT_SAVE_NEW_SUCCESS:
            const { analytics } = action.config;
            return {
                ...state,
                analytics
            };

        default:
            return state;
    }
};

export default reports;
