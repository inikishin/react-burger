import {getOrderNumberRequest} from "../handleApi";
import {TIngredient} from "../../types";

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';

export const ADD_INGREDIENT_TO_BURGER: 'ADD_INGREDIENT_TO_BURGER' = 'ADD_INGREDIENT_TO_BURGER';
export const CHANGE_INGREDIENT_IN_BURGER: 'CHANGE_INGREDIENT_IN_BURGER' = 'CHANGE_INGREDIENT_IN_BURGER';
export const DELETE_INGREDIENT_FROM_BURGER: 'DELETE_INGREDIENT_FROM_BURGER' = 'DELETE_INGREDIENT_FROM_BURGER';

export interface IOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST
}
export interface IOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS,
  readonly orderNumber: number
}
export interface IOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED
}

export interface IAddIngredientToBurgerAction {
    readonly type: typeof ADD_INGREDIENT_TO_BURGER,
    readonly ingredient: TIngredient,
    readonly ingredientIndex: number
}

export interface IChangeIngredientInBurgerAction {
    readonly type: typeof CHANGE_INGREDIENT_IN_BURGER,
    readonly oldIndex: number,
    readonly currentIndex: number
}

export interface IDeleteIngredientFromBurgerAction {
    readonly type: typeof DELETE_INGREDIENT_FROM_BURGER,
    readonly ingredientIndex: number
}

export type TOrderActions =
    | IOrderNumberRequestAction
    | IOrderNumberSuccessAction
    | IOrderNumberFailedAction
    | IAddIngredientToBurgerAction
    | IChangeIngredientInBurgerAction
    | IDeleteIngredientFromBurgerAction;

export function getOrderNumber(ingredientsIds: Array<string>) {
    return function (dispatch: any) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST
        });
        getOrderNumberRequest(ingredientsIds).then(res => {
            console.log(res);
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((apiData) => {
            if (!apiData.order.number) {
                throw new Error("No data");
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderNumber: apiData.order.number
                });
            }
        }).catch(e => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                });
            });
    }
}