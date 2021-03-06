import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concatMapTo';
import 'rxjs/add/observable/empty';
import programEpics from './programs';
import orgUnitEpics from './orgUnits';
import reportEpics from './reports';
import formEpics from './form';
import optionEpics from './optionSets';
import dataStoreEpics from './dataStore';

const errorEpic = action$ =>
  action$
    .filter(action => action.type.indexOf('ERROR') !== -1)
    .do(action => console.error(action.error))
    .concatMapTo(Observable.empty());

export default combineEpics(errorEpic, programEpics, orgUnitEpics, reportEpics, formEpics, optionEpics, dataStoreEpics);
