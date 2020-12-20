import isEmpty from '../validation/is-empty';
import { SET_PROVIDER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  provider: {},
};

export default function reducerStates(state = initialState, action) {
  switch (action.type) {
    case SET_PROVIDER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        provider: action.payload,
      };
    default:
      return state;
  }
}
