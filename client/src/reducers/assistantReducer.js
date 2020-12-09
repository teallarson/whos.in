import {
  ADD_ASSISTANT,
  GET_ASSISTANTS,
  ASSISTANT_LOADING
} from '../actions/types';

const initialState = {
  assistant: {},
  assistants: [],
  loading: false,
};

export default function reducerStates(state=initialState, action){

  switch(action.type){
    case ASSISTANT_LOADING:
      return{
        ...state,
        loading: true
      };
    case ADD_ASSISTANT:
      return {
        ...state,
        assistant: action.payload
      }
    case GET_ASSISTANTS: 
      return {
        ...state,
        assistants: action.payload,
        loading: false
      };
    default: 
      return state
  }
}