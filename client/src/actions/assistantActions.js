import axios from 'axios';
import { 
  ADD_ASSISTANT, 
  SET_ERROR, 
  CLEAR_ERRORS,
  ASSISTANT_LOADING,
  GET_ASSISTANTS,
   } from "./types"

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