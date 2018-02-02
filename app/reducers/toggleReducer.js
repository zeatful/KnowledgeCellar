import {HEADER_EDIT_MODE} from '../constants/ActionTypes'
import _ from 'lodash'

export default function (state = [], action) {
  switch (action.type) {
    case HEADER_EDIT_MODE:
      return action.payload
    default:
      return state
  }
}