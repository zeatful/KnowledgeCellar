// reducers.js

import { combineReducers } from 'redux';
import HeaderReducer from './headerReducer';

const reducers = combineReducers({
  headers: HeaderReducer
});

export default reducers;