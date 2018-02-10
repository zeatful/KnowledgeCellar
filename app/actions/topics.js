import { SELECT_TOPIC, DELETE_TOPIC, CREATE_TOPIC, FETCH_TOPICS } from '../constants/ActionTypes'
import axios from 'axios'

const ROOT_URL = 'http://localhost:3000/api/topics'

export const selectTopic = topic => {
  return dispatch => {
    dispatch(selectedTopic(topic))
  }
}

export const fetchTopics = () => {
  return dispatch => {
    axios.get(ROOT_URL).then(res => {
      // dispatch triggers a state change
      dispatch(getTopics(res.data))
      // set the default selected topic to first item
      dispatch(updateSelectedTopic(res.data[0]))
    })
  }
}

export const addTopic = title => {
  return dispatch => {
    axios.post(ROOT_URL, {title}).then(res => {
      // dispatch triggers a state change
      dispatch(createTopic(res.data))
    })
  }
}

export const deleteTopic = (id) => {
  return dispatch => {
    axios.delete(`${ROOT_URL}/${id}`).then(res => {
      // dispatch triggers a state change
      dispatch(removeTopic(id))
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

const removeTopic = payload => {
  return {type: DELETE_TOPIC, payload}
}

const updateSelectedTopic = payload => {
  return {type: SELECT_TOPIC, payload}
}