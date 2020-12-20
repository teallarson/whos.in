import { SET_ERROR, SET_PROVIDER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

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

