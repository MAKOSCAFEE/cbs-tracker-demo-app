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
export const saveNewReport = (action$, store) =>
    action$.ofType(types.REPORT_SAVE_NEW).concatMap(({ config }) => {
        const { program, orgUnits, programStages } = config;
        const state = store.getState();
        const { programStageDataElements, programTrackedEntityAttributes } = state;
        const attributes = programTrackedEntityAttributes[program].filter(
            item => item.id !== 'HAZ7VQ730yn'
        );

        const newAnalyticRequest = programStages.map(prid => {
            const dataElements = programStageDataElements[prid];
            const dataItems = [...attributes, ...dataElements];
            return getAnalyticsRequest(
                { id: program },
                { id: prid },
                { id: 'LAST_12_MONTHS' },
                null,
                null,
                orgUnits,
                dataItems,
                null
            );
        });

        return Promise.all(newAnalyticRequest)
            .then(analytics => {
                console.log(analytics);
                return saveNewReportSuccess({ reportId: program, analytics: analytics[0] });
            })
            .catch(errorActionCreator(types.PROGRAMS_LOAD_ERROR));
    });

export default combineEpics(saveReport, saveNewReport);

// Also used to query for server cluster in map/EventLayer.js
export const getAnalyticsRequest = async (
    program,
    programStage,
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
        .withStage(programStage.id);

    analyticsRequest = period
        ? analyticsRequest.addPeriodFilter(period.id)
        : analyticsRequest.withStartDate(startDate).withEndDate(endDate);

    analyticsRequest = analyticsRequest.addOrgUnitDimension(orgUnits.map(ou => ou.id));
    if (dataItems) {
        dataItems.forEach(item => {
            analyticsRequest = analyticsRequest.addDimension(item.id);
        });
    }
    return d2.analytics.events.getQuery(analyticsRequest);
};
