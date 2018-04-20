/** @flow */
import PropTypes from 'prop-types';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import './MultiGridLineList.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

import { CSVLink } from 'react-csv';

export default class MultiGridLineList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        const { data } = this.props;
        this.state = {
            data
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const { data } = nextProps;
            this.setState(state => ({ ...state, data }));
        }
    }

    render() {
        const { data } = this.state;
        const { columns, rows, columnsSize } = data;

        const reactTableColumns = columns.map(({ column, name }) => ({
            Header: column,
            accessor: name,
            width: columnsSize[name] * 60 * 0.16
        }));
        const columnEntity = columns.reduce((obj, item) => {
            return obj.concat({ label: item.column, key: item.name });
        }, []);

        return (
            <div className="LineListing">
                <div className="LineListing__header">
                    <h4>Number of Rows: {rows.length}</h4>
                    {rows.length ? (
                        <CSVLink
                            data={rows}
                            headers={columnEntity}
                            filename={'LineListing.csv'}
                            className="downloadButton"
                            target=""
                        >
                            Export To Csv
                        </CSVLink>
                    ) : (
                        ''
                    )}
                </div>
                <AutoSizer>
                    {({ height, width }) => {
                        return (
                            <ReactTable
                                data={rows}
                                filterable
                                noDataText="No Data to display"
                                defaultFilterMethod={(filter, row) => {
                                    const rowValue = String(row[filter.id]).toLowerCase();
                                    const filterValue = String(filter.value).toLowerCase();
                                    return rowValue.includes(filterValue);
                                }}
                                columns={reactTableColumns}
                                defaultPageSize={50}
                                style={{
                                    width: `${width}px`,
                                    height: `${height - 63}px`
                                }}
                                className="-striped -highlight"
                            />
                        );
                    }}
                </AutoSizer>
            </div>
        );
    }
}

MultiGridLineList.propTypes = {
    data: PropTypes.object
};
