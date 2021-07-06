import {getIngredientRequest, getOrderNumberRequest} from "../handleApi";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER';
export const CHANGE_INGREDIENT_IN_BURGER = 'CHANGE_INGREDIENT_IN_BURGER';
export const DELETE_INGREDIENT_FROM_BURGER = 'DELETE_INGREDIENT_FROM_BURGER';

export function getIngredients() {
    return function (dispatch) {
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

export function getOrderNumber(ingredientsIds) {
    return function (dispatch) {
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