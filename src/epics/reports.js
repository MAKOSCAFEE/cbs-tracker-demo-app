import { combineEpics } from 'redux-observable';
import * as types from '../constants/actionTypes';
import { apiFetch } from '../util/api';
import { getMergedAnalytics } from '../util/analytics';
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
    action$.ofType(types.REPORT_SAVE_NEW).concatMap(() => {
        const state = store.getState();
        const {
            programStageDataElements,
            programTrackedEntityAttributes,
            optionSets,
            form
        } = state;
        const { program, orgUnits, programStages, period, startDate, endDate, filters } = form;
        const attributes =
            programTrackedEntityAttributes[program].filter(item => item.id !== 'HAZ7VQ730yn') || [];
        const programdataElements = programStages.map(prid => programStageDataElements[prid])[0];

        const newAnalyticRequest = programStages.map(prid => {
            return getAnalyticsRequest(
                { id: program },
                { id: prid },
                period,
                startDate,
                endDate,
                orgUnits,
                filters,
                null
            );
        });

        return Promise.all(newAnalyticRequest)
            .then(analytics => {
                const mergedAnalytics = getMergedAnalytics(analytics);
                const linelist = transformForTableList(
                    mergedAnalytics,
                    attributes,
                    programdataElements,
                    optionSets
                );
                return saveNewReportSuccess({ analytics: mergedAnalytics, linelist });
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

    analyticsRequest =
        period && period.id !== 'START_END_DATES'
            ? analyticsRequest.addPeriodFilter(period.id)
            : analyticsRequest.withStartDate(startDate).withEndDate(endDate);

    analyticsRequest = analyticsRequest.addOrgUnitDimension(orgUnits.map(ou => ou.id));
    if (dataItems) {
        dataItems.forEach(item => {
            analyticsRequest = analyticsRequest.addDimension(item);
        });
    }
    return d2.analytics.events.getQuery(analyticsRequest);
};

const transformForTableList = (analytics, attributes, dataElements, optionSets) => {
    const { headers, metaData, rows } = analytics;
    const defaultColumns = ['eventdate', 'ouname', 'longitude', 'latitude'];
    const dataItems = [
        ...defaultColumns,
        ...[...attributes, ...dataElements].map(dataitem => dataitem.id)
    ];
    const columns = headers.filter(header => dataItems.includes(header.name));
    const attributesCount = attributes.length;
    let columnsSize = {};
    const tableRows = rows.map((row, index) =>
        row.reduce((obj, value, index) => {
            const header = headers[index];
            if (dataItems.includes(header.name)) {
                if (header.optionSet) {
                    const options = optionSets[header.optionSet].options;
                    const option = options.filter(opt => opt.code === value)[0];
                    obj[header.name] = (option || metaData.items[value] || {}).name || value;
                } else {
                    obj[header.name] = (metaData.items[value] || {}).name || value;
                }
                const valueLength =
                    obj[header.name].length > header.column.length
                        ? obj[header.name].length
                        : header.column.length;
                const size =
                    columnsSize[header.name] > valueLength ? columnsSize[header.name] : valueLength;
                columnsSize[header.name] = size;
            }
            return obj;
        }, {})
    );

    return {
        rows: tableRows,
        columns,
        attributesCount,
        columnsSize
    };
};
