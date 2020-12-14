import axios from 'axios';
import { 
  ADD_SUITE, 
  SET_ERROR, 
  CLEAR_ERRORS,
  SUITE_LOADING,
  GET_SUITES,
  } from "./types"

//Add Suites
export const addSuite = (suiteData) => dispatch => {
  dispatch(clearErrors());
  axios
      .post('api/suites/add', suiteData)
      .then(res => 
        dispatch({
          type: ADD_SUITE,
          payload: res.data
        }))
      .catch(err => dispatch({
          type: SET_ERROR,
          payload: err.response.data
        }));
};

//Get Suites
export const getSuites = () => dispatch => {
  dispatch(setSuiteLoading());
  axios
    .get('api/suites')
    .then((res) => 
      dispatch({
        type: GET_SUITES,
        payload: res.data,
      })
    )
    .catch((err) => 
      dispatch({
        type: GET_SUITES,
        payload: null,
      })
    );
};



//Suite loading
export const setSuiteLoading = () => {
  return {
    type: SUITE_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return{
    type: CLEAR_ERRORS
  };
};