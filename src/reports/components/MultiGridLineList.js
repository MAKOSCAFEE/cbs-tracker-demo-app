/** @flow */
import PropTypes from 'prop-types';
import * as React from 'react';
import { MultiGrid, AutoSizer } from 'react-virtualized';
import './MultiGridLineList.css';
import sortByLodash from 'lodash/fp/sortBy';
import reverse from 'lodash/fp/reverse';
import SortDirection from '../../constants/sortDirection';

const STYLE = {
    border: '2px solid #ddd'
};
const STYLE_BOTTOM_LEFT_GRID = {
    borderRight: '2px solid #aaa',
    backgroundColor: '#f7f7f7',
    overflowY: 'hidden'
};
const STYLE_TOP_LEFT_GRID = {
    borderBottom: '2px solid #aaa',
    borderRight: '2px solid #aaa',
    fontWeight: 'bold',
    overflowX: 'hidden'
};
const STYLE_TOP_RIGHT_GRID = {
    borderBottom: '2px solid #aaa',
    fontWeight: 'bold',
    overflowX: 'hidden'
};

export default class MultiGridLineList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        const { data } = this.props;
        const height = typeof window === 'object' ? 0.8 * window.innerHeight : 600;
        const width = typeof window === 'object' ? 0.73 * window.innerWidth : 600;
        this.state = {
            fixedRowCount: 2,
            scrollToColumn: 0,
            scrollToRow: 0,
            height,
            width,
            data,
            sortDirection: SortDirection.ASC
        };
        this.handleResize = this.handleResize.bind(this);
        this._handleSort = this._handleSort.bind(this);
        this.filterCells = this.filterCells.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            const { data } = nextProps;
            this.setState(state => ({ ...state, data }));
        }
    }

    handleResize(e) {
        e.stopPropagation();
        this.setState({
            height: 0.8 * window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.handleResize);
    }

    render() {
        const { data, sortDirection } = this.state;
        const { columns, rows, columnsSize, attributesCount } = data;
        const fixedColumnCount = attributesCount < 3 ? attributesCount : 3;
        const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
            // headers
            if (rowIndex < 1) {
                return renderHeaderCell({ columnIndex, key, rowIndex, style });
            }
            if (rowIndex === 1) {
                return renderFilterCell({ columnIndex, key, rowIndex, style });
            }
            return renderBodyCell({ columnIndex, key, rowIndex, style });
        };

        const renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
            return (
                <div className="Cell" key={key} style={style}>
                    {rows[rowIndex - 1][columns[columnIndex].name]}
                </div>
            );
        };

        const renderFilterCell = ({ columnIndex, key, rowIndex, style }) => {
            return (
                <div className="Cell" key={key} style={style}>
                    <input onChange={event => this.filterCells(event, columnIndex)} />
                </div>
            );
        };
        const renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
            return (
                <div
                    className="Cell"
                    key={key}
                    style={style}
                    onClick={() => this._handleSort(columnIndex)}
                >
                    {columns[columnIndex].column}
                    <svg width={18} height={18} viewBox="0 0 24 24">
                        {sortDirection === SortDirection.ASC ? (
                            <path d="M7 14l5-5 5 5z" />
                        ) : (
                            <path d="M7 10l5 5 5-5z" />
                        )}
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </div>
            );
        };
        const _getColumnWidth = ({ index }) => {
            const colId = columns[index].name;
            return columnsSize[colId] * 60 * 0.16;
        };

        return (
            <div>
                <h4>Number of Rows: {rows.length}</h4>
                <AutoSizer>
                    {({ width }) => (
                        <MultiGrid
                            {...this.state}
                            cellRenderer={cellRenderer}
                            columnWidth={_getColumnWidth}
                            enableFixedColumnScroll
                            enableFixedRowScroll
                            rowHeight={40}
                            fixedColumnCount={fixedColumnCount}
                            rowCount={(rows && rows.length + 1) || 10}
                            columnCount={columns.length}
                            style={STYLE}
                            styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                            styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                            styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                            width={this.state.width}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }

    _handleSort(columnIndex) {
        const { sortDirection } = this.state;
        const _sortDirection =
            sortDirection === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
        this._sort({ sortBy: columnIndex, sortDirection: _sortDirection });
    }

    filterCells(evt, columnIndex) {
        const { data } = this.props;
        const { rows, columns } = data;
        const filterValue = evt.target.value.toLowerCase();
        const columnName = columns[columnIndex].name;
        const filteredRows = rows.filter(row =>
            row[columnName].toLowerCase().includes(filterValue)
        );
        this.setState({ data: { ...data, rows: filteredRows } });
    }

    _sort({ sortBy, sortDirection }) {
        const { sortBy: prevSortBy, sortDirection: prevSortDirection } = this.state;
        const { data } = this.props;
        let sortedData = data.rows;

        // If list was sorted DESC by this column.
        // Rather than switch to ASC, return to "natural" order.
        // if (prevSortDirection === SortDirection.DESC) {
        //     sortBy = null;
        //     sortDirection = null;
        // }

        if (sortBy !== prevSortBy || sortDirection !== prevSortDirection) {
            const { columns, rows } = data;

            console.log(sortDirection);

            if (sortBy != null) {
                const key = columns[sortBy].name;
                if (sortDirection === SortDirection.DESC) {
                    sortedData = sortByLodash(key, rows);
                    sortedData = reverse(sortedData);
                } else {
                    sortedData = sortByLodash(key, rows);
                }
            }
        }

        this.setState({ sortBy, sortDirection, data: { ...data, rows: sortedData } });
    }
}

MultiGridLineList.propTypes = {
    data: PropTypes.object
};
