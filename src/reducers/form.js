import * as types from '../constants/actionTypes';

const form = (state = {}, action) => {
    switch (action.type) {
        case types.FORM_SET:
            return { ...state, ...action.payload };
        case types.TOGGLE_FORM_ORGUNIT:
            return {
                ...state,
                orgUnits: toggleOrgUnitsState(state.orgUnits, action.orgUnit)
            };
        default:
            return state;
    }
};

export default form;

export const toggleOrgUnitsState = (orgUnits = [], orgUnit) => {
    const hasOrgUnit = orgUnits.some(ou => ou.id === orgUnit.id);
    return hasOrgUnit ? orgUnits.filter(ou => ou.id !== orgUnit.id) : [...orgUnits, { ...orgUnit }];
};
