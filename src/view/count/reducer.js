import { ADD_COUNT } from './actionType';

const initialState = {
  count: 10,
};

export const addCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNT: return {
      ...state,
      count: state.count + 1,
    };
    default: return state;
  }
};

export const getCount = state => state.addCountReducer.count;
