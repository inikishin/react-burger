import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    INCREASE_INGREDIENT_COUNTER,
    DECSEASE_INGREDIENT_COUNTER,
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    isLoadingIngredients: false,
    hasErrorIngredients: false,
}

export const ingredients = (state = initialState, action) => {
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

        case INCREASE_INGREDIENT_COUNTER: {
            let ingredient = action.ingredient;
            let updatedIngredients = state.ingredients;

            if (ingredient.type === "bun") {
                updatedIngredients.forEach(item => {
                    if (item.type === 'bun') {
                        (item._id === ingredient._id) ? item.counter = 1 : item.counter = 0
                    }
                });
            }
            else
            {
                let itemIndex = state.ingredients.findIndex(item => item._id === ingredient._id);
                ingredient.counter ? ingredient = {...ingredient, counter: ingredient.counter + 1} : ingredient = {...ingredient, counter: 1};
                updatedIngredients.splice(itemIndex, 1, ingredient);
            }

            return {...state, ingredients: updatedIngredients};
        }

        case DECSEASE_INGREDIENT_COUNTER: {
            let updatedIngredients = state.ingredients;
            let item = state.ingredients.find(item => item._id === action.ingredient._id);
            let itemIndex = state.ingredients.findIndex(item => item._id === action.ingredient._id);
            item.counter ? item = {...item, counter: item.counter - 1} : item = {...item, counter: 0};
            updatedIngredients.splice(itemIndex, 1, item);

            return {...state, ingredients: updatedIngredients};
        }

        default: {
            return state;
        }
    }
}

