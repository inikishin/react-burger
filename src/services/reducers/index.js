import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { order } from "./order";
import { auth } from "./auth";

export const rootReducer = combineReducers({
    ingredients: ingredients,
    order: order,
    auth: auth
});