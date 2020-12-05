import {combineReducers} from 'redux';
import assistantReducer from './assistantReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  assistant: assistantReducer,
  errors: errorReducer
});