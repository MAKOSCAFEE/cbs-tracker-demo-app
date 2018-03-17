import { getInstance as getD2 } from 'd2/lib/d2';

// import store from '../store';

const propertyMap = {
    name: 'name',
    displayName: 'name',
    shortName: 'shortName',
    displayShortName: 'shortName'
};

export const getDisplayProperty = (d2, displayProperty) => {
    const keyAnalysisDisplayProperty = d2.currentUser.settings.keyAnalysisDisplayProperty;
    return propertyMap[keyAnalysisDisplayProperty] || propertyMap[displayProperty] || 'name'; // TODO: check
};

export const getDisplayPropertyUrl = d2 => {
    // return `${getDisplayProperty(d2)}~rename(name)`; // TODO
    return `displayName~rename(name)`;
};

export const analysisFields = async () => {
    const d2 = await getD2();
    const namePropertyUrl = await getDisplayPropertyUrl(d2);
    return [
        '*',
        `columns[dimension,filter,items[dimensionItem~rename(id),dimensionItemType,${namePropertyUrl}]]`,
        `rows[dimension,filter,items[dimensionItem~rename(id),dimensionItemType,${namePropertyUrl}]]`,
        `filters[dimension,filter,items[dimensionItem~rename(id),dimensionItemType,${namePropertyUrl}]]`,
        'dataDimensionItems',
        `program[id,${namePropertyUrl}]`,
        'programStage[id,displayName~rename(name)]',
        'legendSet[id,displayName~rename(name)]',
        '!lastUpdated',
        '!href',
        '!created',
        '!publicAccess',
        '!rewindRelativePeriods',
        '!userOrganisationUnit',
        '!userOrganisationUnitChildren',
        '!userOrganisationUnitGrandChildren',
        '!externalAccess',
        '!access',
        '!relativePeriods',
        '!columnDimensions',
        '!rowDimensions',
        '!filterDimensions',
        '!user',
        '!organisationUnitGroups',
        '!itemOrganisationUnitGroups',
        '!userGroupAccesses',
        '!indicators',
        '!dataElements',
        '!dataElementOperands',
        '!dataElementGroups',
        '!dataSets',
        '!periods',
        '!organisationUnitLevels',
        '!organisationUnits',
        '!sortOrder',
        '!topLimit'
    ];
};

export const legendFields = [
    '*',
    '!created',
    '!lastUpdated',
    '!displayName',
    '!externalAccess',
    '!access',
    '!userGroupAccesses'
];

export const legendSetFields = [
    'id,displayName~rename(name),legends[' + legendFields.join(',') + ']'
];
