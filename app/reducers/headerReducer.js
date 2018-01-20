import { FETCH_HEADERS } from '../constants/ActionTypes';
import _ from 'lodash';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_HEADERS:
      return action.headers;
    default:
      return state;
  }
}