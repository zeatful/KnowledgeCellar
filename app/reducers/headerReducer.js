import {FETCH_HEADERS, CREATE_HEADER, DELETE_HEADER} from '../constants/ActionTypes';
import _ from 'lodash';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HEADERS:
      return action.payload;
    case CREATE_HEADER:
      return [...state, action.payload];
    case DELETE_HEADER:
      return state.filter(h => h._id !== action.payload)
    default:
      return state;
  }
}