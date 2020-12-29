import isEmpty from '../validation/is-empty';
import { SET_PROVIDER, PROVIDER_LOADING, GET_PROVIDERS } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  provider: {},
  providers: {},
  loading: false
};

export default function reducerStates(state = initialState, action) {
  switch (action.type) {
    case PROVIDER_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_PROVIDERS:
      return {
        ...state,
        providers: action.payload,
        loading: false
      };
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
