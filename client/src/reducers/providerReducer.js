import isEmpty from '../validation/is-empty';
import { SET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  provider: {},
};

export default function (state = initialState, action) {
  switch (action.type){
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