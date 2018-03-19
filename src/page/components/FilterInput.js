import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDataFilter, clearDataFilter } from '../../actions/dataFilters';
import './FilterInput.css';

// http://adazzle.github.io/react-data-grid/examples.html#/custom-filters
// https://github.com/adazzle/react-data-grid/tree/master/packages/react-data-grid-addons/src/cells/headerCells/filters
const FilterInput = ({ layerId, type, dataKey, filters, setDataFilter, clearDataFilter }) => {
    const filterValue = '';

    // https://stackoverflow.com/questions/36683770/react-how-to-get-the-value-of-an-input-field
    const onChange = evt => {
        const value = evt.target.value;
    };

    return (
        <input
            className="FilterInput"
            placeholder={type === 'number' ? '2,>3&<8' : 'Search'} // TODO: Support more field types
            value={filterValue}
            onClick={evt => evt.stopPropagation()}
            onChange={onChange}
        />
    );
};

FilterInput.propTypes = {
    layerId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    setDataFilter: PropTypes.func.isRequired,
    clearDataFilter: PropTypes.func.isRequired
};

export default connect(null, { setDataFilter, clearDataFilter })(FilterInput);
