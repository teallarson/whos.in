import { SET_ERROR, SET_PROVIDER, PROVIDER_LOADING, GET_PROVIDERS, GET_ERRORS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//register provider
export const registerProvider = (providerData, history) => (dispatch) => {
  axios
    .post('/api/providers/register', providerData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

//login provider
export const loginProvider = (providerData) => (dispatch) => {
  axios
    .post('/api/providers/login', providerData)
    .then((res) => {
      //save the token to localstorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //Write provider info to redux
      dispatch({
        type: SET_PROVIDER,
        payload: decoded,
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      })
    );
};

//get all providers
export const getProviders = () => dispatch => {
  dispatch(setProviderLoading());
  axios 
    .get('/api/providers/all')
    .then((res) => 
      dispatch({
        type: GET_PROVIDERS,
        payload: res.data,
      })
    )
    .catch(err => dispatch({
      type: SET_ERROR,
      payload: err.response.data
    }));
}

//loout provider
export const logoutProvider = () => (dispatch) => {
  //Remove token from ls
  localStorage.removeItem('jwtToken');
  //Remove token from axios header
  setAuthToken(false);
  //Reset provider in the redux store
  dispatch({
    type: SET_PROVIDER,
    payload: {},
  });
};

//change provider password
export const changePassword = (providerData, history) => (dispatch) => {
  axios
    .post("/api/providers/changepw", providerData)
    .then((res) => {
      //Remove token from ls
      localStorage.removeItem("jwtToken");
      //Remove token from axios header
      setAuthToken(false);
      //Reset provider in the redux store
       history.push("/landing");
      dispatch({
        type: SET_PROVIDER,
        payload: {},
      });
    })
    .catch();
   
};

//delete provider
export const deleteProvider = () => (dispatch) => {
  if(window.confirm("Are you sure?  This can no be undone!")){
    axios 
      .delete('/api/providers/delete')
      .then((res) => dispatch({
          type: GET_PROVIDERS,
          payload: res.data
        })
      )
      .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }
}

//Suite loading
export const setProviderLoading = () => {
  return {
    type: PROVIDER_LOADING
  };
};