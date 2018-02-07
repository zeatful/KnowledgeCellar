import { SELECT_HEADER, DELETE_HEADER, CREATE_HEADER, FETCH_HEADERS } from '../constants/ActionTypes'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/headers'

export const selectHeader = header => {
  return dispatch => {
    dispatch(selectedHeader(header))
  }
}

export const fetchHeaders = () => {
  return dispatch => {
    axios.get(ROOT_URL).then(res => {
      // dispatch triggers a state change
      dispatch(getHeaders(res.data))
      // set the default selected header to first item
      dispatch(updateSelectedHeader(res.data[0]))
    })
  }
}

export const addHeader = title => {
  return dispatch => {
    axios.post(ROOT_URL, {title}).then(res => {
      // dispatch triggers a state change
      dispatch(createHeader(res.data))
    })
  }
}

export const deleteHeader = (id) => {
  return dispatch => {
    axios.delete(`${ROOT_URL}/${id}`).then(res => {
      // dispatch triggers a state change
      dispatch(removeHeader(id))
    })
  }
}

const selectedHeader = payload => {
  return {type: SELECT_HEADER, payload}
}

const getHeaders = payload => {
  return {type: FETCH_HEADERS, payload}
}

const createHeader = payload => {
  return {type: CREATE_HEADER, payload}
}

const removeHeader = payload => {
  return {type: DELETE_HEADER, payload}
}

const updateSelectedHeader = payload => {
  return {type: SELECT_HEADER, payload}
}