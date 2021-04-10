import { combineReducers } from 'redux';
import { addCountReducer } from './count/reducer';
import { employeeReducer } from './employee/reducer';
import { users as userReducer } from './user/reducer';
// import { alert as alertReducer } from './alert/reducer';

export default combineReducers({
  addCountReducer,
  employeeReducer,
  userReducer,
  // alertReducer
});
