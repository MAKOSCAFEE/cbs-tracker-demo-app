import * as types from '../constants/actionTypes';

const defaultState = {};

const reports = (state = defaultState, action) => {
    switch (action.type) {
        case types.REPORT_SAVE_NEW_SUCCESS:
            console.log(action);
            return {
                ...state,
                [action.reportId]: action.payload
            };

        default:
            return state;
    }
};

export default reports;
