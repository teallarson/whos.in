import {
  ADD_SUITE,
  GET_SUITES,
  SUITE_LOADING
} from '../actions/types';

const initialState = {
  suite: {},
  suites: [],
  loading: false,
};

export default function reducerStates(state=initialState, action){

  switch(action.type){
    case SUITE_LOADING:
      return{
        ...state,
        loading: true
      };
    case ADD_SUITE:
      return {
        ...state,
        suite: action.payload
      }
    case GET_SUITES: 
      return {
        ...state,
        suites: action.payload,
        loading: false
      };
    default: 
      return state
  }
}