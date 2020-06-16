import {combineReducers } from 'redux';
import userReducer from '../Reducers/userReducer';
import trackerDataReducer from '../Reducers/trackerDataReducer'; 

const rootReducer = combineReducers({
    users: userReducer,
    trackerData: trackerDataReducer
  });

export default rootReducer;