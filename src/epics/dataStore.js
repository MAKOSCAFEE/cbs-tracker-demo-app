import { combineEpics } from 'redux-observable';
import * as types from '../constants/actionTypes';
import {
  createDataStoreSuccess,
  createDataStore,
  loadDataStoreSuccess,
  saveDataStoreSuccess
} from '../actions/dataStore';
import { getInstance as getD2 } from 'd2/lib/d2';
import 'rxjs/add/operator/concatMap';
import { errorActionCreator } from '../actions/helpers';
import { generateUid } from 'd2/lib/uid';
import {
  loadProgramTrackedEntityAttributes,
  loadProgramStageDataElements,
  loadProgramStages
} from '../actions/programs';

const DATA_STORE_NAME_SPACE = 'tracker-report-app';
// Save existing report
export const checkDataStore$ = action$ =>
  action$.ofType(types.DATA_STORE_CHECK).concatMap(() =>
    getD2()
      .then(d2 => d2.dataStore.has(DATA_STORE_NAME_SPACE))
      .then(exists => (exists ? createDataStoreSuccess(DATA_STORE_NAME_SPACE) : createDataStore(DATA_STORE_NAME_SPACE)))
      .catch(errorActionCreator(types.DATA_STORE_CHECK_FAIL))
  );

export const createDataStore$ = action$ =>
  action$.ofType(types.DATA_STORE_CREATE).concatMap(({ namespace }) =>
    getD2()
      .then(d2 => d2.dataStore.create(namespace))
      .then(namespace => namespace.set('init', {}))
      .then(() => createDataStoreSuccess(DATA_STORE_NAME_SPACE))
      .catch(errorActionCreator(types.DATA_STORE_CREATE_FAIL))
  );

export const loadDataStore$ = action$ =>
  action$.ofType(types.DATA_STORE_CREATE_SUCCESS).concatMap(({ namespace }) =>
    getD2()
      .then(d2 => d2.dataStore.get(DATA_STORE_NAME_SPACE))
      .then(namespace => {
        const { keys } = namespace;
        const allPromises = keys.map(key => namespace.get(key));
        return Promise.all(allPromises);
      })
      .then(values => loadDataStoreSuccess(values))
      .catch(errorActionCreator(types.DATA_STORE_LOAD_FAIL))
  );

export const selectDataStoreForm$ = action$ =>
  action$.ofType(types.DATA_STORE_SELECT_FORM).mergeMap(({ form }) => {
    const { program, programStages } = form;
    const actionsStages = programStages.map(stage => loadProgramStageDataElements(stage));
    return [...actionsStages, loadProgramStages(program), loadProgramTrackedEntityAttributes(program)];
  });

export const saveDataStore$ = action$ =>
  action$.ofType(types.DATA_STORE_SAVE).concatMap(({ values }) => {
    const key = values.id || generateUid();
    const keyValue = {
      ...values,
      id: key
    };
    return getD2()
      .then(d2 => d2.dataStore.get(DATA_STORE_NAME_SPACE))
      .then(namespace => namespace.set(key, keyValue))
      .then(() => saveDataStoreSuccess(keyValue))
      .catch(errorActionCreator(types.DATA_STORE_SAVE_SUCCESS));
  });

export default combineEpics(checkDataStore$, createDataStore$, loadDataStore$, saveDataStore$, selectDataStoreForm$);
