// reducers.js

import { combineReducers } from 'redux'
import TopicReducer from './topicReducer'
import SelectedTopicReducer from './selectedTopicReducer';

// add all your reducers here
const reducers = combineReducers({
  selectedTopic: SelectedTopicReducer,
  topics: TopicReducer
})

export default reducers