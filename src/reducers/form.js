import * as types from '../constants/actionTypes';

const form = (state = {}, action) => {
  switch (action.type) {
    case types.FORM_SET:
      return action.payload;
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

    case types.FORM_FILTERS_SET:
      return {
        ...state,
        filters: action.filters
      };

    case types.FORM_START_DATE_SET:
      return {
        ...state,
        startDate: action.startDate
      };

    case types.FORM_END_DATE_SET:
      return {
        ...state,
        endDate: action.endDate
      };

    case types.DATA_STORE_SELECT_FORM:
      return {
        ...action.form
      };
    default:
      return state;
  }
};

export default form;

export const toggleOrgUnitsState = (orgUnits = [], orgUnit) => {
  const { id, displayName, path, name } = orgUnit;
  const _orgUnit = { id, displayName, path, name };
  const hasOrgUnit = orgUnits.some(ou => ou.id === id);
  return hasOrgUnit ? orgUnits.filter(ou => ou.id !== id) : [...orgUnits, { ..._orgUnit }];
};
