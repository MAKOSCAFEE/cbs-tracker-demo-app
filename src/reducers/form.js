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
        case types.FORM_PERIOD_TYPE_SET:
            return {
                ...state,
                periodType: action.periodType
            };

        case types.FORM_PROGRAM_SET:
            return {
                ...state,
                program: action.program
            };

        case types.FORM_PROGRAM_STAGES_SET:
            return {
                ...state,
                programStages: action.programStages
            };

        case types.FORM_PERIOD_SET:
            return {
                ...state,
                period: action.period
            };

        case types.FORM_START_DATE_SET:
            return {
                ...state,
                startDate: action.startDate
            };
        case types.DATA_FILTER_SET:
        case types.DATA_FILTER_CLEAR:
            return {
                ...state,
                filters: state.filters.map(l => form(l, action))
            };

        case types.FORM_END_DATE_SET:
            return {
                ...state,
                endDate: action.endDate
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
