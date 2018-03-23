import React, { PureComponent } from 'react';
import './EpiCurve.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeriesCanvas
} from 'react-vis';

export default class Epicurve extends PureComponent {
    constructor(props) {
        super(props);

        const height = typeof window === 'object' ? 0.83 * window.innerHeight : 600;
        const width = typeof window === 'object' ? 0.7 * window.innerWidth : 600;
        console.log(window);
        this.state = {
            height,
            width
        };
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        e.stopPropagation();
        this.setState({
            height: 0.83 * window.innerHeight,
            width: 0.7 * window.innerHeight
        });
    }

    render() {
        const { width, height } = this.state;
        return (
            <div>
                <XYPlot width={width} height={height} stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeriesCanvas
                        data={[{ x: 2, y: 10 }, { x: 4, y: 5 }, { x: 5, y: 15 }]}
                    />
                    <VerticalBarSeriesCanvas
                        data={[{ x: 2, y: 12 }, { x: 4, y: 2 }, { x: 5, y: 11 }]}
                    />
                </XYPlot>
            </div>
        );
    }
}
