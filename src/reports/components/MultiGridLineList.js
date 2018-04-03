/** @flow */
import PropTypes from 'prop-types';
import * as React from 'react';
import { MultiGrid, AutoSizer } from 'react-virtualized';
import './MultiGridLineList.css';

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
        const height = typeof window === 'object' ? 0.7 * window.innerHeight : 600;
        this.state = {
            fixedRowCount: 1,
            scrollToColumn: 0,
            scrollToRow: 0,
            height,
            data
        };
        this.handleResize = this.handleResize.bind(this);
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
            height: 0.7 * window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.handleResize);
    }

    render() {
        const { data } = this.state;
        const { columns, rows, columnsSize, attributesCount } = data;
        const fixedColumnCount = attributesCount < 3 ? attributesCount : 3;
        const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
            // headers
            if (rowIndex < 1) {
                return renderHeaderCell({ columnIndex, key, rowIndex, style });
            }
            return renderBodyCell({ columnIndex, key, rowIndex, style });
        };

        const renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
            return (
                <div className="Cell" key={key} style={style}>
                    {rows[rowIndex][columns[columnIndex].name]}
                </div>
            );
        };
        const renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
            return (
                <div className="Cell" key={key} style={style}>
                    {columns[columnIndex].column}
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
                            rowCount={rows.length}
                            columnCount={columns.length}
                            style={STYLE}
                            styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                            styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                            styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                            width={width}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

MultiGridLineList.propTypes = {
    data: PropTypes.object
};
