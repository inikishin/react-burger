import {getIngredientRequest} from "../handleApi";
import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    IAddIngredientToBurgerAction,
    IChangeIngredientInBurgerAction,
    IDeleteIngredientFromBurgerAction,
    IOrderNumberFailedAction,
    IOrderNumberRequestAction,
    IOrderNumberSuccessAction
} from "./order";
import {AppDispatch, AppThunk, TIngredient} from "../../types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT_DATA: 'ADD_INGREDIENT_DATA' = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA: 'DELETE_INGREDIENT_DATA' = 'DELETE_INGREDIENT_DATA';

export const INCREASE_INGREDIENT_COUNTER: 'INCREASE_INGREDIENT_COUNTER' = 'INCREASE_INGREDIENT_COUNTER';
export const DECSEASE_INGREDIENT_COUNTER: 'DECSEASE_INGREDIENT_COUNTER' = 'DECSEASE_INGREDIENT_COUNTER';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly ingredients: Array<TIngredient>
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT_DATA,
  readonly currentIngredient: TIngredient
}
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT_DATA
}

export interface IIncreaseIngredientAction {
    readonly type: typeof INCREASE_INGREDIENT_COUNTER,
    readonly ingredient: TIngredient
}

export interface IDecseaseIngredientAction {
    readonly type: typeof DECSEASE_INGREDIENT_COUNTER,
    readonly ingredient: TIngredient
}

export type TIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IIncreaseIngredientAction
    | IDecseaseIngredientAction;

export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredientRequest().then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((apiData) => {
            if (!apiData.data) {
                throw new Error("No data");
            } else {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: apiData.data
                });
            }
        }).catch(e => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
            });
    }
}
