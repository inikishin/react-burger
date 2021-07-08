import {getIngredientRequest} from "../handleApi";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';
export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';

export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER';
export const DECSEASE_INGREDIENT_COUNTER = 'DECSEASE_INGREDIENT_COUNTER';

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
