import React, { Component } from 'react';
import './page.css';

export default class TrackerReport extends Component {
    render() {
        return (
            <div className="page">
                Current section: Reports
                <br />
                <br />
                Icons are simple strings, which are converted into Material icons &lt;FontIcon />
                elements by the Sidebar component.<br />
                <br />
                This requires that the Material icons font is loaded by the app.
            </div>
        );
    }
}
