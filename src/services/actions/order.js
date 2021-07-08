import {getOrderNumberRequest} from "../handleApi";

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER';
export const CHANGE_INGREDIENT_IN_BURGER = 'CHANGE_INGREDIENT_IN_BURGER';
export const DELETE_INGREDIENT_FROM_BURGER = 'DELETE_INGREDIENT_FROM_BURGER';

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