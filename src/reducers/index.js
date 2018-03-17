import { combineReducers } from 'redux';
import programs from './programs';
import programDataElements from './programDataElements';
import programStages from './programStages';
import programStageDataElements from './programStageDataElements';
import programTrackedEntityAttributes from './programTrackedEntityAttributes';
import form from './form';

export default combineReducers({
    programs,
    programDataElements,
    programStages,
    programStageDataElements,
    programTrackedEntityAttributes,
    form
});
