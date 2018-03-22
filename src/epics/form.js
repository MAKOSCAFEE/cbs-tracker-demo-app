import { combineEpics } from 'redux-observable';
import * as types from '../constants/actionTypes';
import {
    loadProgramTrackedEntityAttributes,
    loadProgramStageDataElements
} from '../actions/programs';

// Save existing report
export const selectProgramLoadAttributes = (action$, store) =>
    action$
        .ofType(types.FORM_PROGRAM_SET)
        .map(({ program }) => loadProgramTrackedEntityAttributes(program));

export const selectProgramStageLoadDataElements = action$ =>
    action$
        .ofType(types.FORM_PROGRAM_STAGES_SET)
        .map(({ programStages }) =>
            loadProgramStageDataElements(programStages[programStages.length - 1])
        );

export default combineEpics(selectProgramLoadAttributes, selectProgramStageLoadDataElements);
