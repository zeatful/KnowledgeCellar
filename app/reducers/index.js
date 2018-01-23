// reducers.js

import { combineReducers } from 'redux';
import HeaderReducer from './headerReducer';

// add all your reducers here
const reducers = combineReducers({
  headers: HeaderReducer
});

export default reducers;