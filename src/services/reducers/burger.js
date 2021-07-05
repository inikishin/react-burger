import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_CONSTRUCTOR_INGREDIENTS,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    ADD_INGREDIENT_TO_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
} from '../actions/burger';

const initialState = {
    ingredients: [],
    isLoadingIngredients: false,
    hasErrorIngredients: false,
    currentBurger: {bun: {}, main: [], total: 0},
    currentIngredient: {},
    order: {number: '', isLoadingOrderNumber: false, hasErrorOrderNumber: false}
}

export const burger = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoadingIngredients: true, hasErrorIngredients: false}
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredients: action.ingredients, isLoadingIngredients: false}
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, isLoadingIngredients: false, hasErrorIngredients: true}
        }

        case ADD_INGREDIENT_DATA: {
            return {...state, currentIngredient: action.currentIngredient}
        }
        case DELETE_INGREDIENT_DATA: {
            return {...state, currentIngredient: initialState.currentIngredient}
        }

        case GET_ORDER_NUMBER_REQUEST: {
            return {...state, order: {...state.order, isLoadingOrderNumber: true, hasErrorOrderNumber: false}}
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {...state, order: {...state.order, number:  action.orderNumber, isLoadingOrderNumber: false}}
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {...state, order: {...state.order, isLoadingOrderNumber: false, hasErrorOrderNumber: true}}
        }

        case ADD_INGREDIENT_TO_BURGER: {
            let ingredient = state.ingredients.filter(element => element._id === action.ingredientId.id);
            let newState = {};

            if (ingredient[0].type === "bun") {
                newState = {...state,
                currentBurger: {...state.currentBurger, bun: ingredient[0]},
                ingredients: [...state.ingredients.filter(item => item._id !== ingredient[0]._id),
                    {...state.ingredients.filter(item => item._id === ingredient[0]._id)[0], counter: 1}]}
            }
            else
            {
                let item = state.ingredients.filter(item => item._id === ingredient[0]._id)[0];
                item.counter ? item = {...item, counter: item.counter + 1} : item = {...item, counter: 1}

                newState = {...state,
                    currentBurger: {...state.currentBurger, main: [...state.currentBurger.main, ...ingredient]},
                    ingredients: [...state.ingredients.filter(item => item._id !== ingredient[0]._id), item]
                }
            }

            let total = 0;
            newState.currentBurger.bun.price && (total = newState.currentBurger.bun.price * 2);
            newState.currentBurger.main.forEach((item) => {total += item.price});
            newState = {...newState, currentBurger: {...newState.currentBurger, total: total} }
            return newState
        }

        case DELETE_INGREDIENT_FROM_BURGER: {
            let newMain = state.currentBurger.main;
            newMain.splice(action.ingredientIndex, 1);
            return {...state, currentBurger: {...state.currentBurger, main: newMain}}
        }

        default: {
            return state;
        }
    }
}
