import * as types from '../constants/actionTypes';

const defaultState = {};

const reports = (state = defaultState, action) => {
    switch (action.type) {
        case types.REPORT_SAVE_NEW_SUCCESS:
            const { reportId, analytics } = action.config;
            return {
                ...state,
                [reportId]: analytics
            };

        default:
            return state;
    }
};

export default reports;
