// reducers.js

import { combineReducers } from 'redux'
import HeaderReducer from './headerReducer'
import SelectedHeaderReducer from './selectedHeaderReducer';
import ToggleReducer from './toggleReducer';

// add all your reducers here
const reducers = combineReducers({
  toggleEditMode: ToggleReducer,
  selectedHeader: SelectedHeaderReducer,
  headers: HeaderReducer
})

export default reducers