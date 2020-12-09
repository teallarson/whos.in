import {combineReducers} from 'redux';
import assistantReducer from './assistantReducer';
import errorReducer from './errorReducer';
import suiteReducer from './suiteReducer';

export default combineReducers({
  assistant: assistantReducer,
  errors: errorReducer,
  suite: suiteReducer,
});