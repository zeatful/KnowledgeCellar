import { FETCH_HEADERS, CREATE_HEADER } from '../constants/ActionTypes';
import _ from 'lodash';

const initialState = {
  headers: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_HEADERS:
      return action.headers;
    case CREATE_HEADER:
    console.log(action.newHeader);
      return {
        ...state,
        headers: [...state.headers, action.newHeader]
      }
    default:
      return state;
  }
}