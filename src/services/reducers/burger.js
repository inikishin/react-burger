import {v4 as uuidv4} from "uuid";
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
    CHANGE_INGREDIENT_IN_BURGER,
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
            let ingredient = state.ingredients.find(element => element._id === action.ingredientId.id);
            let newState = {};

            if (ingredient.type === "bun") {
                let updatedIngredients = state.ingredients;
                updatedIngredients.forEach(item => {
                    if (item.type === 'bun') {
                        (item._id === ingredient._id) ? item.counter = 1 : item.counter = 0
                    }
                });

                newState = {...state,
                    currentBurger: {...state.currentBurger, bun: ingredient},
                    ingredients: updatedIngredients,
                }
            }
            else
            {
                let item = state.ingredients.find(item => item._id === ingredient._id);
                let itemIndex = state.ingredients.findIndex(item => item._id === ingredient._id);
                item.counter ? item = {...item, counter: item.counter + 1} : item = {...item, counter: 1};
                let updatedIngredients = state.ingredients;
                updatedIngredients.splice(itemIndex, 1, item);

                ingredient.key = uuidv4();
                let updatedConstructor = state.currentBurger.main;
                updatedConstructor.splice(action.ingredientIndex + 1, 0, ingredient);

                newState = {...state,
                    currentBurger: {...state.currentBurger, main: updatedConstructor},
                    ingredients: updatedIngredients
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
            updatedMain.splice(action.currentIndex+1, 0, item[0]);

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

            // Ищем ингредиент в списке ингредиентов, уменьшаем количество на 1 и обновляем элемент в массиве
            let item = state.ingredients.find(item => item._id === action.ingredientId);
            let itemIndex = state.ingredients.findIndex(item => item._id === action.ingredientId);
            item.counter ? item = {...item, counter: item.counter - 1} : item = {...item, counter: 0};
            let updatedIngredients = state.ingredients;
            updatedIngredients.splice(itemIndex, 1, item);

            return {...state,
                    currentBurger: {...state.currentBurger, main: newMain, total: total},
                    ingredients: updatedIngredients}
        }

        default: {
            return state;
        }
    }
}
