import React, { PureComponent } from 'react';
import './LineSeries.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
} from 'react-vis';

export default class LineSeriesComponent extends PureComponent {
    constructor(props) {
        super(props);

        const height = typeof window === 'object' ? 0.7 * window.innerHeight : 600;
        const width = typeof window === 'object' ? 0.7 * window.innerWidth : 600;
        this.state = {
            height,
            width
        };
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        e.stopPropagation();
        this.setState({
            height: 0.7 * window.innerHeight,
            width: 0.7 * window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.handleResize);
    }

    render() {
        const { width, height } = this.state;
        return (
            <div>
                <XYPlot width={width} height={height}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <XAxis title="X Axis" position="start" />
                    <YAxis title="Y Axis" />
                    <LineSeries
                        className="first-series"
                        data={[{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }]}
                    />
                    <LineSeries
                        className="second-series"
                        data={[{ x: 1, y: 7 }, { x: 2, y: 11 }, { x: 3, y: 9 }, { x: 4, y: 2 }]}
                    />
                    <LineSeries
                        className="third-series"
                        curve={'curveMonotoneX'}
                        style={{
                            strokeDasharray: '2 2'
                        }}
                        data={[{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 3, y: 2 }, { x: 4, y: 15 }]}
                        strokeDasharray="7, 3"
                    />
                </XYPlot>
            </div>
        );
    }
}
