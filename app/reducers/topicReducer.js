import {FETCH_TOPICS, CREATE_TOPIC, DELETE_TOPIC, UPDATE_TOPIC} from '../constants/ActionTypes'
import _ from 'lodash'

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TOPICS:
      return action.payload
    case CREATE_TOPIC:
      return [...state, action.payload]
    case UPDATE_TOPIC:
      // immutable update topic array with a title update
      return Object.assign([...state], {[action.index]: action.payload})
    case DELETE_TOPIC:
      // filter returns a new array and does not mutate state
      return state.filter(h => h._id !== action.payload)
    default:
      return state
  }
}