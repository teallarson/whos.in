import { SET_ERROR, SET_PROVIDER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const loginProvider = (providerData) => (dispatch) => {
  axios 
    .post('/api/providers/login', providerData)
    .then((res) => {
      //save token to localstorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //write provider info to redux
      dispatch({
        type: SET_PROVIDER,
        payload: decoded
      });
    })
    .catch((err) => 
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    })
  );
};

export const logoutUser = () => (dispatch) => {
  //remove token from ls
  localStorage.removeItem('jwt-token');
  //remove token from auth header
  setAuthToken(false);
  //reset redux store
  dispatch({
    type: SET_PROVIDER,
    payload: {}
  });
}

export const changePassword = (providerData, history) => (dispatch) => {
  axios
    .post('/api/users/changepw', providerData)
    .then((res) => {
      //remove token from ls
      localStorage.removeItem('jwtToken');
      //remove from auth header
      setAuthToken(false);
      //reset user in redux store
      history.push('/login');
      dispatch({
        type: SET_PROVIDER,
        payload: {},
      });
    })
    .catch();
};