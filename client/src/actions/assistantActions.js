import axios from 'axios';
import { 
  ADD_ASSISTANT, 
  SET_ERROR, 
  CLEAR_ERRORS,
  ASSISTANT_LOADING,
  GET_ASSISTANTS,
  GET_ERRORS,
   } from "./types"

//Add assistant
export const addAssistant = (assistantData) => dispatch => {
  dispatch(clearErrors())
  console.log(assistantData);
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
export const deleteAssistant = () => (dispatch) => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    axios 
      .delete('/api/assistants/delete')
      .then((res) => dispatch({
          type: GET_ASSISTANTS,
          payload: res.data
        })
      )
      .catch((err) => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
  }
}

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