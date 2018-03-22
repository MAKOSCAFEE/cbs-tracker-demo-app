import * as types from '../constants/actionTypes';

const optionSets = (state = {}, action) => {
    switch (action.type) {
        case types.OPTION_SET_ADD:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case types.OPTION_SET_ADD_ALL:
            const optionSets = action.payload;
            const entity = optionSets.reduce((obj, optionSet, index) => {
                obj[optionSet.id] = { ...optionSet };
                return obj;
            }, {});
            return {
                ...state,
                ...entity
            };

        default:
            return state;
    }
};

export default optionSets;
