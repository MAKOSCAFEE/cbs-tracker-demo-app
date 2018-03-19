import React, { Component } from 'react';
import './page.css';
// import { Column, Table } from 'react-virtualized';
import { connect } from 'react-redux';

const ValueTable = ({ data, isLoading }) => {
    if (!data) {
        return 'No values here';
    }

    if (isLoading) {
        return 'Loading...';
    }

    const { headers, metaData, rows } = data;

    return (
        <section>
            <table>
                <thead>
                    <tr>{headers.map((header, index) => <th key={index}>{header.column}</th>)}</tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {row.map((value, index) => (
                                <td key={index}>{(metaData.items[value] || {}).name || value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

class TrackerReport extends Component {
    render() {
        const { data, isLoading } = this.props;
        // const width = typeof window === 'object' ? 0.65 * window.innerWidth : 450;
        // const height = typeof window === 'object' ? 0.65 * window.innerHeight : 600;
        return (
            <div className="page">
                <ValueTable data={data} isLoading={isLoading} />;
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.reports.analytics,
    isLoading: state.reports.loading
});

export default connect(mapStateToProps)(TrackerReport);
