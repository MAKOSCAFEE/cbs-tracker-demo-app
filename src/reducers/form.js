import * as types from '../constants/actionTypes';

const form = (state = {}, action) => {
    switch (action.type) {
        case types.FORM_SET:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default form;
