// store/rootReducer.ts

import { combineReducers } from 'redux';
import interviewReducer from './reducer';

const rootReducer = combineReducers({
  interview: interviewReducer,
});

export default rootReducer;
