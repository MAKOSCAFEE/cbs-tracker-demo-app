/** @flow */
import * as React from 'react';
import { Grid, ScrollSync, AutoSizer } from 'react-virtualized';
import cn from 'classnames';
import './LineList.css';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

const LEFT_COLOR_FROM = hexToRgb('#ffffff');
const LEFT_COLOR_TO = hexToRgb('#ffffff');
const TOP_COLOR_FROM = hexToRgb('#dae6e8');
const TOP_COLOR_TO = hexToRgb('#dae6e8');

export default class LineListing extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

        const height = typeof window === 'object' ? 0.8 * window.innerHeight : 600;
        const { data } = this.props;
        const { headers, rows } = data;
        const columnCount = headers.length;
        const rowCount = rows.length;

        this.state = {
            columnWidth: 100,
            columnCount,
            height,
            overscanColumnCount: 0,
            overscanRowCount: 5,
            rowHeight: 40,
            rowCount
        };
    }

    render() {
        const {
            columnCount,
            columnWidth,
            height,
            overscanColumnCount,
            overscanRowCount,
            rowHeight,
            rowCount
        } = this.state;
        const { data } = this.props;
        const { headers, rows, metaData } = data;

        const renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
            if (columnIndex < 1) {
                return;
            }

            return renderLeftSideCell({ columnIndex, key, rowIndex, style });
        };

        const renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
            if (columnIndex < 1) {
                return;
            }

            return renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
        };

        const renderLeftHeaderCell = ({ columnIndex, key, style }) => {
            return (
                <div className="headerCell" key={key} style={style}>
                    {`${headers[columnIndex].column}`}
                </div>
            );
        };

        const renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => {
            const rowClass =
                rowIndex % 2 === 0
                    ? columnIndex % 2 === 0 ? 'evenRow' : 'oddRow'
                    : columnIndex % 2 !== 0 ? 'evenRow' : 'oddRow';
            const classNames = cn(rowClass, 'cell');
            const row = rows[rowIndex];
            const value = row[columnIndex];

            return (
                <div className={classNames} key={key} style={style}>
                    {`${(metaData.items[value] || {}).name || value}`}
                </div>
            );
        };

        return (
            <ScrollSync>
                {({
                    clientHeight,
                    clientWidth,
                    onScroll,
                    scrollHeight,
                    scrollLeft,
                    scrollTop,
                    scrollWidth
                }) => {
                    const x = scrollLeft / (scrollWidth - clientWidth);
                    const y = scrollTop / (scrollHeight - clientHeight);

                    const leftBackgroundColor = mixColors(LEFT_COLOR_FROM, LEFT_COLOR_TO, y);
                    const leftColor = '#000000';
                    const topBackgroundColor = mixColors(TOP_COLOR_FROM, TOP_COLOR_TO, x);
                    const topColor = '#000000';
                    const middleBackgroundColor = mixColors(
                        leftBackgroundColor,
                        leftBackgroundColor,
                        0.5
                    );
                    const middleColor = '#000000';

                    return (
                        <div className="GridRow">
                            <div
                                className="LeftSideGridContainer"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    color: leftColor,
                                    backgroundColor: `rgb(${topBackgroundColor.r},${
                                        topBackgroundColor.g
                                    },${topBackgroundColor.b})`
                                }}
                            >
                                <Grid
                                    cellRenderer={renderLeftHeaderCell}
                                    className="HeaderGrid"
                                    width={columnWidth}
                                    height={rowHeight}
                                    rowHeight={rowHeight}
                                    columnWidth={columnWidth}
                                    rowCount={1}
                                    columnCount={1}
                                />
                            </div>
                            <div
                                className="LeftSideGridContainer"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: rowHeight,
                                    color: leftColor,
                                    backgroundColor: `rgb(${leftBackgroundColor.r},${
                                        leftBackgroundColor.g
                                    },${leftBackgroundColor.b})`
                                }}
                            >
                                <Grid
                                    overscanColumnCount={overscanColumnCount}
                                    overscanRowCount={overscanRowCount}
                                    cellRenderer={renderLeftSideCell}
                                    columnWidth={columnWidth}
                                    columnCount={1}
                                    className="LeftSideGrid"
                                    height={height - scrollbarSize()}
                                    rowHeight={rowHeight}
                                    rowCount={rowCount}
                                    scrollTop={scrollTop}
                                    width={columnWidth}
                                />
                            </div>
                            <div className="GridColumn">
                                <AutoSizer disableHeight>
                                    {({ width }) => (
                                        <div>
                                            <div
                                                style={{
                                                    backgroundColor: `rgb(${topBackgroundColor.r},${
                                                        topBackgroundColor.g
                                                    },${topBackgroundColor.b})`,
                                                    color: topColor,
                                                    height: rowHeight,
                                                    width: width - scrollbarSize()
                                                }}
                                            >
                                                <Grid
                                                    className="HeaderGrid"
                                                    columnWidth={columnWidth}
                                                    columnCount={columnCount}
                                                    height={rowHeight}
                                                    overscanColumnCount={overscanColumnCount}
                                                    cellRenderer={renderHeaderCell}
                                                    rowHeight={rowHeight}
                                                    rowCount={1}
                                                    scrollLeft={scrollLeft}
                                                    width={width - scrollbarSize()}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    backgroundColor: `rgb(${
                                                        middleBackgroundColor.r
                                                    },${middleBackgroundColor.g},${
                                                        middleBackgroundColor.b
                                                    })`,
                                                    color: middleColor,
                                                    height,
                                                    width
                                                }}
                                            >
                                                <Grid
                                                    className="BodyGrid"
                                                    columnWidth={columnWidth}
                                                    columnCount={columnCount}
                                                    height={height}
                                                    onScroll={onScroll}
                                                    overscanColumnCount={overscanColumnCount}
                                                    overscanRowCount={overscanRowCount}
                                                    cellRenderer={renderBodyCell}
                                                    rowHeight={rowHeight}
                                                    rowCount={rowCount}
                                                    width={width}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </AutoSizer>
                            </div>
                        </div>
                    );
                }}
            </ScrollSync>
        );
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}

/**
 * Ported from sass implementation in C
 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
 */
function mixColors(color1, color2, amount) {
    const weight1 = amount;
    const weight2 = 1 - amount;

    const r = Math.round(weight1 * color1.r + weight2 * color2.r);
    const g = Math.round(weight1 * color1.g + weight2 * color2.g);
    const b = Math.round(weight1 * color1.b + weight2 * color2.b);

    return { r, g, b };
}
