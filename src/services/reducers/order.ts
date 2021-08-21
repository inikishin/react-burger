import {v4 as uuidv4} from "uuid";

import {
    ADD_INGREDIENT_TO_BURGER,
    CHANGE_INGREDIENT_IN_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../actions/order";

import {TOrderActions} from "../actions/order";
import {TIngredient} from "../../types";

type TOrder = {number: number, isLoadingOrderNumber: boolean, hasErrorOrderNumber: boolean};

type TCurrentBurger = {bun: TIngredient | null, main: Array<TIngredient>, total: number};

export type TOrderState = {
    currentBurger: TCurrentBurger,
    currentIngredient: TIngredient | null,
    order: TOrder
};

export const initialState: TOrderState = {
    currentBurger: {bun: null, main: [], total: 0},
    currentIngredient: null,
    order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
}

export const order = (state = initialState, action: TOrderActions) => {

    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {...state, order: {...state.order, isLoadingOrderNumber: true, hasErrorOrderNumber: false}}
        }

        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                currentBurger: {...initialState.currentBurger, main: []},
                order: {...state.order, number: action.orderNumber, isLoadingOrderNumber: false}
            }
        }

        case GET_ORDER_NUMBER_FAILED: {
            return {...state, order: {...state.order, isLoadingOrderNumber: false, hasErrorOrderNumber: true}}
        }

        case ADD_INGREDIENT_TO_BURGER: {
            let ingredient = action.ingredient;
            let newState = initialState;

            if (ingredient.type === "bun") {
                newState = {...state,
                    currentBurger: {...state.currentBurger, bun: ingredient},
                }
            }
            else
            {
                ingredient.key = uuidv4();
                let updatedConstructor = state.currentBurger.main;
                updatedConstructor.splice(action.ingredientIndex, 0, ingredient);

                newState = {...state,
                    currentBurger: {...state.currentBurger, main: updatedConstructor},
                };
            }

            let total = 0;
            if (newState.currentBurger.bun) {
                newState.currentBurger.bun.price && (total = newState.currentBurger.bun.price * 2);
            }
            newState.currentBurger.main.forEach((item) => {
                total += item.price
            });
            newState = {...newState, currentBurger: {...newState.currentBurger, total: total}}
            return newState
        }

        case CHANGE_INGREDIENT_IN_BURGER: {
            let updatedMain = state.currentBurger.main;
            let item = updatedMain.splice(action.oldIndex, 1);
            updatedMain.splice(action.currentIndex, 0, item[0]);

            return {...state, currentBurger: {...state.currentBurger, main: updatedMain}};
        }

        case DELETE_INGREDIENT_FROM_BURGER: {
            let newMain = state.currentBurger.main;
            newMain.splice(action.ingredientIndex, 1);

            let total = 0;
            if (state.currentBurger.bun) {
                state.currentBurger.bun.price && (total = state.currentBurger.bun.price * 2);
            }
            newMain.forEach((item) => {
                total += item.price});

            return {...state,
                    currentBurger: {...state.currentBurger, main: newMain, total: total},
            }
        }

        default: {
            return state;
        }
    }
}