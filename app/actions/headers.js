import { FETCH_HEADERS } from '../constants/ActionTypes'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/headers'

export default function fetchHeaders(){
  return dispatch => {
    axios.get(ROOT_URL).then(res => {
      console.log(res);
      dispatch(getHeaders(res.data));
    });
  }
}

function getHeaders(headers) {
  return {
    type: FETCH_HEADERS,
    headers
  };
}