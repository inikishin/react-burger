import { combineReducers } from "redux";
import { burger } from './burger';

export const rootReducer = combineReducers({burger: burger});