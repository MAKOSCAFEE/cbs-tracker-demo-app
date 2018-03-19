import * as types from '../constants/actionTypes';

export const formSet = payload => ({
    type: types.FORM_SET,
    payload
});

// Set Program
export const setFormProgram = program => ({
    type: types.FORM_PROGRAM_SET,
    program
});

// Set programStage
export const setFormProgramStages = programStages => ({
    type: types.FORM_PROGRAM_STAGES_SET,
    programStages
});

export const formToggleOrgUnit = orgUnit => ({
    type: types.TOGGLE_FORM_ORGUNIT,
    orgUnit
});

// Set period type (thematic)
export const setPeriodType = periodType => ({
    type: types.FORM_PERIOD_TYPE_SET,
    periodType
});

// Set period (event & thematic)
export const setPeriod = period => ({
    type: types.FORM_PERIOD_SET,
    period
});

// Set start date (event)
export const setStartDate = startDate => ({
    type: types.FORM_START_DATE_SET,
    startDate
});

// Set end date (event)
export const setEndDate = endDate => ({
    type: types.FORM_END_DATE_SET,
    endDate
});
