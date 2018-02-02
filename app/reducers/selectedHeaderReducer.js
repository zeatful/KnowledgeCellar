import {SELECT_HEADER} from '../constants/ActionTypes'
import _ from 'lodash'

export default function (state = [], action) {
  switch (action.type) {
    case SELECT_HEADER:
      return action.payload
    default:
      return state
  }
}