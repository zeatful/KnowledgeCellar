// reducers.js

import { combineReducers } from 'redux'
import HeaderReducer from './headerReducer'
import SelectedHeaderReducer from './selectedHeaderReducer';

// add all your reducers here
const reducers = combineReducers({
  selectedHeader: SelectedHeaderReducer,
  headers: HeaderReducer
})

export default reducers