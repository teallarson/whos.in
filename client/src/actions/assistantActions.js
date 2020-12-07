import axios from 'axios';
import { 
  ADD_ASSISTANT, 
  SET_ERROR, 
  CLEAR_ERRORS,
  ASSISTANT_LOADING,
  GET_ASSISTANTS,
  GET_ERRORS } from "./types"

//Add assistant
export const addAssistant = (assistantData) => dispatch => {
  dispatch(clearErrors());
  axios
      .post('api/assistants/add', assistantData)
      .then(res => 
        dispatch({
          type: ADD_ASSISTANT,
          payload: res.data
        }))
      .catch(err => dispatch({
          type: SET_ERROR,
          payload: err.response.data
        }));
};

//Get Assistants
export const getAssistants = () => dispatch => {
  dispatch(setAssistantLoading());
  axios
    .get('api/assistants')
    .then((res) => 
      dispatch({
        type: GET_ASSISTANTS,
        payload: res.data,
      })
    )
    .catch((err) => 
      dispatch({
        type: GET_ASSISTANTS,
        payload: null,
      })
    );
};

//Update Assistant
export const updateAssistant = (assistantData, history) => dispatch => {
  axios
    .post('/api/assistants/update', assistantData)
    .then(res => history.push('/'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Assistant

//Assistant loading
export const setAssistantLoading = () => {
  return {
    type: ASSISTANT_LOADING
  };
};

//Clear errors
export const clearErrors = () => {
  return{
    type: CLEAR_ERRORS
  };
};