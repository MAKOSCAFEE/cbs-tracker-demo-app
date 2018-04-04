import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card';
import GroupEditor from './GroupEditor.component';
import Store from 'd2-ui/lib/store/Store';
import './SelectionGroupEditor.css';
import { setFilters } from '../../actions/form';
import { connect } from 'react-redux';
import * as _ from 'lodash';

const itemStore = Store.create();
const assignedItemStore = Store.create();

class SelectionGroupEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedItems: [],
            filterText: null
        };
        itemStore.state = [];
        assignedItemStore.state = [];
        this.assignItems = this.assignItems.bind(this);
        this.unassignItems = this.unassignItems.bind(this);
    }
    render() {
        const { form, programStageDataElements, programTrackedEntityAttributes } = this.props;
        let itemsCollection = [];
        const { programStages, program } = form;
        if (program) {
            const attributes = programTrackedEntityAttributes[program];
            if (attributes) {
                const values = attributes.map(({ id, name }) => ({
                    value: id,
                    text: `[PA] ${name}`
                }));
                itemsCollection = [...itemsCollection, ...values];
            }
        }
        if (programStages) {
            const dataElements = programStages.reduce((acc, curr) => {
                if (programStageDataElements && programStageDataElements[curr]) {
                    const dtEl = programStageDataElements[curr].map(({ id, name }) => ({
                        value: id,
                        text: `[DE] ${name}`
                    }));
                    acc = [...acc, ...dtEl];
                }
                return acc;
            }, []);
            itemsCollection = [...itemsCollection, ...dataElements];
        }
        itemStore.state = _.uniqBy(itemsCollection, 'value');

        return (
            <Card className="card">
                <CardText className="cardText">
                    <h3 className="cardHeader">Select Filter</h3>
                    <div className="scroll">
                        <GroupEditor
                            itemStore={itemStore}
                            assignedItemStore={assignedItemStore}
                            onAssignItems={this.assignItems}
                            onRemoveItems={this.unassignItems}
                            height={250}
                            filterText={this.state.filterText}
                        />
                    </div>
                </CardText>
            </Card>
        );
    }

    assignItems(items) {
        const { setFilters } = this.props;
        const assigned = assignedItemStore.state.concat(items);
        assignedItemStore.setState(assigned);
        setFilters(assigned);
        return Promise.resolve();
    }

    unassignItems(items) {
        const { setFilters } = this.props;
        const assigned = assignedItemStore.state.filter(item => items.indexOf(item) === -1);
        assignedItemStore.setState(assigned);
        setFilters(assigned);
        return Promise.resolve();
    }
}

const mapStateToProps = state => ({
    form: state.form,
    programTrackedEntityAttributes: state.programTrackedEntityAttributes,
    programStageDataElements: state.programStageDataElements
});
export default connect(mapStateToProps, { setFilters })(SelectionGroupEditor);
