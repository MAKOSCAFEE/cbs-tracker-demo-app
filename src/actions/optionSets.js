import * as types from '../constants/actionTypes';

export const addOptionSet = data => ({
    type: types.OPTION_SET_ADD,
    payload: data
});

export const loadOptionSet = id => ({
    type: types.OPTION_SET_LOAD,
    id
});

export const loadAllOptionSet = () => ({
    type: types.OPTION_SET_LOAD_ALL
});

export const addAllOptionSets = data => ({
    type: types.OPTION_SET_ADD_ALL,
    payload: data
});
