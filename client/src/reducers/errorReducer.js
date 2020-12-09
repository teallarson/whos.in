import { SET_ERROR } from '../actions/types';

const initialState = {};

export default function reducerStates(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
}
