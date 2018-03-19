import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Column } from 'react-virtualized';
import mapValues from 'lodash/fp/mapValues';
import { filterData } from '../../util/filter';
import { setDataFilter, clearDataFilter } from '../../actions/dataFilters';
import './DataTable.css';

class DataTable extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    static defaultProps = {
        data: []
    };

    constructor(props, context) {
        super(props, context);

        // Default sort
        const sortBy = 'index';
        const sortDirection = 'ASC';

        this.state = {
            sortBy: sortBy,
            sortDirection: sortDirection,
            data: this.sort(props.data, sortBy, sortDirection)
        };
    }

    onSort(sortBy, sortDirection) {
        const data = this.state.data;

        this.setState({
            sortBy,
            sortDirection,
            data: this.sort(data, sortBy, sortDirection)
        });
    }

    // TODO: Make sure sorting works across different locales - use lib method
    sort(data, sortBy, sortDirection) {
        return data.sort((a, b) => {
            a = a[sortBy];
            b = b[sortBy];

            if (typeof a === 'number') {
                return sortDirection === 'ASC' ? a - b : b - a;
            }

            if (a !== undefined) {
                return sortDirection === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
            }

            return 0;
        });
    }

    render() {
        const { width, height, data } = this.props;
        const fields = mapValues(() => true, data[0]);
        const { sortBy, sortDirection } = this.state;
        const sortedData = this.sort(data, sortBy, sortDirection);

        return (
            <Table
                className="DataTable"
                width={width}
                height={height}
                headerHeight={48}
                rowHeight={32}
                rowCount={sortedData.length}
                rowGetter={({ index }) => sortedData[index]}
                sort={({ sortBy, sortDirection }) => this.onSort(sortBy, sortDirection)}
                sortBy={sortBy}
                sortDirection={sortDirection}
                useDynamicRowHeight={false}
                hideIndexRow={false}
            >
                <Column
                    cellDataGetter={({ columnData, dataKey, rowData }) => rowData.index}
                    dataKey="index"
                    label="Index"
                    width={72}
                    className="right"
                />
                <Column dataKey="name" label="Name" width={100} />
                <Column dataKey="id" label="id" width={72} className="right" />
                <Column dataKey="level" label="level" width={100} />
            </Table>
        );
    }
}

export default connect(null, {
    setDataFilter,
    clearDataFilter
})(DataTable);
