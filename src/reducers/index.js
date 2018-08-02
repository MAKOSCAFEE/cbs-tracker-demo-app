import { combineReducers } from 'redux';
import orgUnit from './orgUnit';
import orgUnitTree from './orgUnitTree';
import orgUnitGroups from './orgUnitGroups';
import orgUnitGroupSets from './orgUnitGroupSets';
import orgUnitLevels from './orgUnitLevels';
import programs from './programs';
import programDataElements from './programDataElements';
import programStages from './programStages';
import programStageDataElements from './programStageDataElements';
import programTrackedEntityAttributes from './programTrackedEntityAttributes';
import form from './form';
import reports from './reports';
import userSettings from './userSettings';
import optionSets from './optionSets';
import dataStore from './dataStore';

export default combineReducers({
  orgUnit,
  orgUnitTree,
  orgUnitGroupSets,
  orgUnitGroups,
  orgUnitLevels,
  programs,
  programDataElements,
  programStages,
  programStageDataElements,
  programTrackedEntityAttributes,
  form,
  reports,
  optionSets,
  userSettings,
  dataStore
});
