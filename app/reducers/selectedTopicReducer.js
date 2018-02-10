import {SELECT_TOPIC} from '../constants/ActionTypes'
import _ from 'lodash'

export default function (state = [], action) {
  switch (action.type) {
    case SELECT_TOPIC:
      return action.payload
    default:
      return state
  }
}