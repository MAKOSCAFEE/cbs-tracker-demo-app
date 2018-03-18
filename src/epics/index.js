import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concatMapTo';
import 'rxjs/add/observable/empty';
import programEpics from './programs';
import orgUnitEpis from './orgUnits';

const errorEpic = action$ =>
    action$
        .filter(action => action.type.indexOf('ERROR') !== -1)
        .do(action => console.error(action.error))
        .concatMapTo(Observable.empty());

export default combineEpics(errorEpic, programEpics, orgUnitEpis);
