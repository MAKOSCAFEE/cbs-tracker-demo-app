import { combineEpics } from 'redux-observable';
import * as types from '../constants/actionTypes';
import { apiFetch } from '../util/api';
import { getInstance as getD2 } from 'd2/lib/d2';
import { errorActionCreator } from '../actions/helpers';

import { saveNewReportSuccess } from '../actions/reports';

// Save existing report
export const saveReport = (action$, store) =>
    action$.ofType(types.REPORT_SAVE).concatMap(({ config }) => {
        return apiFetch(`/event/query/${config.id}`, 'PUT', config);
    });

// Save new report
export const saveNewReport = action$ =>
    action$.ofType(types.REPORT_SAVE_NEW).concatMap(({ config }) => {
        const { program, orgUnits } = config;
        const newAnalyticRequest = getAnalyticsRequest(
            { id: program },
            { id: 'LAST_12_MONTHS' },
            null,
            null,
            orgUnits,
            null,
            null
        );
        return newAnalyticRequest
            .then(analytics => saveNewReportSuccess(analytics))
            .catch(errorActionCreator(types.PROGRAMS_LOAD_ERROR));
    });

export default combineEpics(saveReport, saveNewReport);

// Also used to query for server cluster in map/EventLayer.js
export const getAnalyticsRequest = async (
    program,
    period,
    startDate,
    endDate,
    orgUnits,
    dataItems,
    eventCoordinateField
) => {
    const d2 = await getD2();

    let analyticsRequest = new d2.analytics.request()
        .withProgram(program.id)
        .withCoordinatesOnly(true);

    analyticsRequest = period
        ? analyticsRequest.addPeriodFilter(period.id)
        : analyticsRequest.withStartDate(startDate).withEndDate(endDate);

    analyticsRequest = analyticsRequest.addOrgUnitDimension(orgUnits.map(ou => ou.id));

    if (eventCoordinateField) {
        // If coordinate field other than event coordinate
        analyticsRequest = analyticsRequest
            .addDimension(eventCoordinateField) // Used by analytics/events/query/
            .withCoordinateField(eventCoordinateField); // Used by analytics/events/count and analytics/events/cluster
    }

    return d2.analytics.events.getQuery(analyticsRequest);
};
