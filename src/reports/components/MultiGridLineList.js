/** @flow */
import PropTypes from 'prop-types';
import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import './MultiGridLineList.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import Workbook from 'react-excel-workbook';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';

export class MultiGridLineList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        const { data, optionSets } = this.props;
        this.state = {
            data,
            optionSets
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const { data } = nextProps;
            this.setState(state => ({ ...state, data }));
        }
    }

    render() {
        const { data, optionSets } = this.state;
        const { columns, rows, columnsSize } = data;

        const reactTableColumns = columns.map(({ column, name, optionSet }, index) => {
            const rColumn = {
                Header: column,
                accessor: name,
                width: columnsSize[name] * 60 * 0.16
            };
            if (optionSet) {
                const options = optionSets[optionSet].options;
                const FilterMethod = (filter, row) => {
                    const rowValue = String(row[filter.id]).toLowerCase();
                    const filterValue = String(filter.value).toLowerCase();
                    if (filterValue === 'clearfilter') {
                        return true;
                    }
                    return rowValue === filterValue;
                };
                const Filter = ({ filter, onChange }) => (
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: '100%' }}
                        value={filter ? filter.value : 'clearfilter'}
                    >
                        <option value="clearfilter" key="cf">
                            Show all
                        </option>
                        {options.map(({ code, name }, index) => (
                            <option value={name} key={index}>
                                {name}
                            </option>
                        ))}
                    </select>
                );

                rColumn['Filter'] = Filter;
                rColumn['FilterMethod'] = FilterMethod;
            }
            return rColumn;
        });
        const columnEntity = columns.reduce((obj, item) => {
            return obj.concat({ label: item.column, key: item.name });
        }, []);

        return (
            <div className="LineListing">
                <div className="LineListing__header">
                    <h4>Number of Rows: {rows.length}</h4>
                    {rows.length ? (
                        <div className="ButtonGroups">
                            <Workbook
                                filename="LineListing.xlsx"
                                element={
                                    <button className="downloadButton">Export to Excel</button>
                                }
                            >
                                <Workbook.Sheet data={rows} name="LineListing">
                                    {columns.map(({ column, name }, index) => (
                                        <Workbook.Column label={column} value={name} key={index} />
                                    ))}
                                </Workbook.Sheet>
                            </Workbook>
                            <CSVLink
                                data={rows}
                                headers={columnEntity}
                                filename={'LineListing.csv'}
                                className="downloadButton"
                                target=""
                            >
                                Export To Csv
                            </CSVLink>
                        </div>
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
                                getTdProps={() => ({ style: { textAlign: 'center' } })}
                                noDataText="No Data to display"
                                defaultFilterMethod={(filter, row) => {
                                    const rowValue = String(row[filter.id]).toLowerCase();
                                    const filterValue = String(filter.value).toLowerCase();
                                    if (filterValue === 'clearfilter') {
                                        return true;
                                    }
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

const mapStateToProps = state => ({
    optionSets: state.optionSets
});

export default connect(mapStateToProps)(MultiGridLineList);
