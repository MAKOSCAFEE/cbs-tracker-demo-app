import * as _ from 'lodash';

export const getMergedAnalytics = splitedAnalyticsArray => {
    /**
     * Check if analytics array is supplied and return null if not
     */
    if (!splitedAnalyticsArray) {
        return null;
    }

    /**
     * Check if analytics layer has only one item and return analytics item
     */
    if (splitedAnalyticsArray && splitedAnalyticsArray.length < 2) {
        return splitedAnalyticsArray.length === 1 ? splitedAnalyticsArray[0] : null;
    }

    /**
     * Get headers
     */
    const headers = _.map(splitedAnalyticsArray, analyticsObject => {
        return {
            headersLength: analyticsObject.headers.length,
            headers: analyticsObject.headers
        };
    }).sort((a, b) => b.headersLength - a.headersLength)[0].headers;

    /**
     * Get metadata information and rows
     */
    const metadataItems = {};
    const metadata = {};
    let mergedRows = [];
    _.each(splitedAnalyticsArray, analyticsObject => {
        if (analyticsObject) {
            const metadataKeys = _.keys(analyticsObject.metaData);
            _.each(metadataKeys, metadataKey => {
                const metadataKeyValues = analyticsObject.metaData[metadataKey];
                if (metadataKey === 'items') {
                    const metadataItemsKeys = _.keys(metadataKeyValues);
                    _.each(metadataItemsKeys, metadataNameKey => {
                        metadataItems[metadataNameKey] =
                            analyticsObject.metaData.items[metadataNameKey];
                    });
                } else {
                    const dimensions = analyticsObject.metaData[metadataKey];
                    const metadataIds = Object.keys(dimensions);
                    if (metadataIds.length > 0) {
                        _.each(metadataIds, metadataId => {
                            if (metadata[metadataKey]) {
                                const existingDimension = metadata[metadataKey][metadataId];
                                const newDimension = dimensions[metadataId];
                                if (existingDimension) {
                                    const mergedDimension = [...existingDimension, ...newDimension];
                                    metadata[metadataKey] = {
                                        ...metadata[metadataKey],
                                        ...{ [metadataId]: mergedDimension }
                                    };
                                } else {
                                    metadata[metadataKey] = {
                                        ...metadata[metadataKey],
                                        ...{ [metadataId]: newDimension }
                                    };
                                }
                            } else {
                                metadata[metadataKey] = { [metadataId]: dimensions[metadataId] };
                            }
                        });
                    } else {
                        metadata[metadataKey] = {};
                    }
                }
            });

            /**
             * Get rows
             */
            const rows = _.map(analyticsObject.rows, row => {
                const rowObject = {};
                _.each(analyticsObject.headers, (header, headerIndex) => {
                    rowObject[header.name] = row[headerIndex];
                });

                return _.map(headers, header => rowObject[header.name] || '');
            });

            mergedRows = [...mergedRows, ...rows];
        }
    });

    metadata.items = metadataItems;
    return {
        headers: headers,
        metaData: metadata,
        rows: mergedRows
    };
};
