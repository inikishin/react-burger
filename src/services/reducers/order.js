import {v4 as uuidv4} from "uuid";

import {
    ADD_INGREDIENT_TO_BURGER, CHANGE_INGREDIENT_IN_BURGER, DELETE_INGREDIENT_FROM_BURGER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../actions/order";

const initialState = {
    currentBurger: {bun: {}, main: [], total: 0},
    currentIngredient: {},
    order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
}

export const order = (state = initialState, action) => {

    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {...state, order: {...state.order, isLoadingOrderNumber: true, hasErrorOrderNumber: false}}
        }

        case GET_ORDER_NUMBER_SUCCESS: {
            return {...state, currentBurger: {...initialState.currentBurger, main: state.currentBurger.main.length===0}, order: {...state.order, number:  action.orderNumber, isLoadingOrderNumber: false}}
        }

        case GET_ORDER_NUMBER_FAILED: {
            return {...state, order: {...state.order, isLoadingOrderNumber: false, hasErrorOrderNumber: true}}
        }

        case ADD_INGREDIENT_TO_BURGER: {
            let ingredient = action.ingredient;
            let newState = {};

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
            newState.currentBurger.bun.price && (total = newState.currentBurger.bun.price * 2);
            newState.currentBurger.main.forEach((item) => {total += item.price});
            newState = {...newState, currentBurger: {...newState.currentBurger, total: total} }
            return newState
        }

        case CHANGE_INGREDIENT_IN_BURGER: {
            let updatedMain = state.currentBurger.main;
            let item = updatedMain.splice(action.oldIndex, 1);
            updatedMain.splice(action.currentIndex, 0, item[0]);

            return {...state, currentBurger: {...state.currentBurger, main: updatedMain}};
        }

        case DELETE_INGREDIENT_FROM_BURGER: {
            // Удаляем элемент из конструктора
            let newMain = state.currentBurger.main;
            newMain.splice(action.ingredientIndex, 1);

            // Обновляем тотал
            let total = 0;
            state.currentBurger.bun.price && (total = state.currentBurger.bun.price * 2);
            newMain.forEach((item) => {total += item.price});

            return {...state,
                    currentBurger: {...state.currentBurger, main: newMain, total: total},
                    //ingredients: updatedIngredients
            }
        }

        default: {
            return state;
        }
    }
}