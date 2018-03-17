import { combineReducers } from 'redux';
import programs from './programs';
import programDataElements from './programDataElements';
import programStages from './programStages';
import programStageDataElements from './programStageDataElements';
import programTrackedEntityAttributes from './programTrackedEntityAttributes';

export default combineReducers({
    programs,
    programDataElements,
    programStages,
    programStageDataElements,
    programTrackedEntityAttributes
});
