import * as types from '../constants/actionTypes';

const initialdata = {
  namespace: null,
  selected: null,
  keys: []
};

const dataStore = (state = initialdata, action) => {
  switch (action.type) {
    case types.DATA_STORE_LOAD_SUCCESS:
      const { values } = action;
      const keys = values.filter(({ id }) => id);
      return {
        ...state,
        keys
      };
    case types.DATA_STORE_CREATE_SUCCESS:
      const { namespace } = action;
      return {
        ...state,
        namespace
      };

    case types.DATA_STORE_SELECT_FORM:
      const { form } = action;
      return {
        ...state,
        selected: form.id
      };

    case types.DATA_STORE_SAVE_SUCCESS:
      const keyValue = action.values;
      const filteredKeys = state.keys.filter(key => key.id !== keyValue.id);
      return {
        ...state,
        keys: [...filteredKeys, keyValue]
      };
    default:
      return state;
  }
};

export default dataStore;
