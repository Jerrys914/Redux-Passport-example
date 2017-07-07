import { combineReducers } from 'redux';
import todos from './todoReducer.js';

const rootReducer = combineReducers({
  todos: todos
});

export default rootReducer;