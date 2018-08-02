import * as types from '../constants/actionTypes';

export const createDataStore = namespace => ({
  type: types.DATA_STORE_CREATE,
  namespace
});

export const createDataStoreSuccess = namespace => ({
  type: types.DATA_STORE_CREATE_SUCCESS,
  namespace
});

export const updateDataStore = namespace => ({
  type: types.DATA_STORE_UPDATE,
  namespace
});

export const updateDataStoreSuccess = namespace => ({
  type: types.DATA_STORE_UPDATE_SUCCESS,
  namespace
});

export const saveDataStore = values => ({
  type: types.DATA_STORE_SAVE,
  values
});

export const saveDataStoreSuccess = values => ({
  type: types.DATA_STORE_SAVE_SUCCESS,
  values
});

export const selectDataStoreForm = form => ({
  type: types.DATA_STORE_SELECT_FORM,
  form
});

export const checkDataStore = () => ({
  type: types.DATA_STORE_CHECK
});

export const checkDataStoreSuccess = namespaces => ({
  type: types.DATA_STORE_CHECK_SUCCESS,
  namespaces
});

export const loadDataStore = namespace => ({
  type: types.DATA_STORE_LOAD,
  namespace
});

export const loadDataStoreSuccess = values => ({
  type: types.DATA_STORE_LOAD_SUCCESS,
  values
});
