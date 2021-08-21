import { combineReducers } from "redux";
import { ingredients } from "./ingredients";
import { order } from "./order";
import { auth } from "./auth";
import { feed } from "./feed";

export const rootReducer = combineReducers({
    ingredients: ingredients,
    order: order,
    auth: auth,
    feed: feed
});

export type TRootState = ReturnType<typeof rootReducer>