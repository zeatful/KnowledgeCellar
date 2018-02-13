import { SELECT_TOPIC, DELETE_TOPIC, CREATE_TOPIC, UPDATE_TOPIC, FETCH_TOPICS } from '../constants/ActionTypes'
import axios from 'axios'

const ROOT_URL = '/api/topics'

export const fetchTopics = () => {
  return dispatch => {
    axios.get(ROOT_URL).then(res => {
      // dispatch triggers a state change
      dispatch(getTopics(res.data))
      // set the default selected topic to first item
      dispatch(selectedTopic(res.data[0]))
    })
  }
}

export const selectTopic = topic => {
  return dispatch => {
    dispatch(selectedTopic(topic))
  }
}

export const deleteTopic = id => {
  return dispatch => {
    axios.delete(`${ROOT_URL}/${id}`).then(res => {
      dispatch(removeTopic(id))
    })
  }
}

export const addTopic = topic => {
  return dispatch => {
    axios.post(ROOT_URL, topic).then(res => {
      console.log('id: ', res.data._id)
      dispatch(createTopic(res.data))
    })
  }
}

export const updateTopic = topic => {
  return dispatch => {
    axios.post(ROOT_URL, topic).then(res => {
      dispatch(editTopic(res.data))
    })
  }
}

const selectedTopic = payload => {
  return {type: SELECT_TOPIC, payload}
}

const getTopics = payload => {
  return {type: FETCH_TOPICS, payload}
}

const createTopic = payload => {
  return {type: CREATE_TOPIC, payload}
}

const editTopic = payload => {
  return {type: UPDATE_TOPIC, payload}
}

const removeTopic = payload => {
  return {type: DELETE_TOPIC, payload}
}