import * as types from '../constants/actionTypes';

const initialdata = {
  namespace: null,
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

    case types.DATA_STORE_SAVE_SUCCESS:
      console.log(action);
      return {
        ...state
      };
    default:
      return state;
  }
};

export default dataStore;
