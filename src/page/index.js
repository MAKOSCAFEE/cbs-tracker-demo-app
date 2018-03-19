import React, { Component } from 'react';
import './page.css';
import { Column, Table } from 'react-virtualized';

export default class TrackerReport extends Component {
    render() {
        const list = [{ name: 'Brian Vaughn', description: 'Software engineer' }];
        return (
            <div className="page">
                <Table
                    width={300}
                    height={300}
                    headerHeight={20}
                    rowHeight={30}
                    rowCount={list.length}
                    rowGetter={({ index }) => list[index]}
                >
                    <Column label="Name" dataKey="name" width={100} />
                    <Column width={200} label="Description" dataKey="description" />
                </Table>
            </div>
        );
    }
}
