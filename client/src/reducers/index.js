import {combineReducers} from 'redux';
import assistantReducer from './assistantReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import suiteReducer from './suiteReducer';

export default combineReducers({
  auth: authReducer,
  assistant: assistantReducer,
  errors: errorReducer,
  suite: suiteReducer,
});