import {combineReducers } from 'redux';
import employeeReducer from '../Reducers/employeeReducer'
import managerReducer from '../Reducers/managerReducer' 

const rootReducer = combineReducers({
    employees: employeeReducer,
    manager: managerReducer
  });

export default rootReducer;