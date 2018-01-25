import {FETCH_HEADERS, CREATE_HEADER} from '../constants/ActionTypes';
import _ from 'lodash';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HEADERS:
      return {
        ...state,
        headers: action.payload
      }
    case CREATE_HEADER:
      return {
        ...state,
        headers: [...state.headers, action.payload]
      }
    default:
      return state;
  }
}