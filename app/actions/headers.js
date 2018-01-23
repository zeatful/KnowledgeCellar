import { DELETE_HEADER, CREATE_HEADER, FETCH_HEADERS } from '../constants/ActionTypes'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/headers'

export const fetchHeaders = () => {
  return dispatch => {
    axios.get(ROOT_URL).then(res => {
      dispatch(getHeaders(res.data));
    })
  }
}

export const addHeader = (header, callback) => {
  return dispatch => {
    axios.post(ROOT_URL, header).then((res) => {
      dispatch(createheader(res.data, callback))
    })
  }
}

export const deleteHeader = (id, callback) => {
  return dispatch => {
    axios.delete(`${ROOT_ROOT}/${id}`).then(() => callback())
    return {type: DELETE_HEADER, payload: id}
  }
}

const getHeaders = (headers) => {
  return {
    type: FETCH_HEADERS,
    headers
  }
}

const createHeader = (header, callback) => {
  callback()
  return {type: CREATE_HEADER, header}
}