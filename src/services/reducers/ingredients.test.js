import {initialState, ingredients} from "./ingredients";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    INCREASE_INGREDIENT_COUNTER,
    DECSEASE_INGREDIENT_COUNTER,
} from '../actions/ingredients';

describe('Testing ingredients reducer', () => {

    it('initialState', () => {
        expect(ingredients(undefined, {})).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('GET_INGREDIENTS_REQUEST', () => {
        const action = {type: GET_INGREDIENTS_REQUEST};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: true,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('GET_INGREDIENTS_SUCCESS', () => {
        const action = {type: GET_INGREDIENTS_SUCCESS, ingredients: ['ingredient 1', 'ingredient 2']};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: ['ingredient 1', 'ingredient 2'],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('GET_INGREDIENTS_FAILED', () => {
        const action = {type: GET_INGREDIENTS_FAILED};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: true,
            currentIngredient: null
        });
    });

    it('ADD_INGREDIENT_DATA', () => {
        const action = {type: ADD_INGREDIENT_DATA, currentIngredient: {_id: '1', name: 'ingridient'}};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: {_id: '1', name: 'ingridient'}
        });
    });

    it('DELETE_INGREDIENT_DATA', () => {
        const action = {type: DELETE_INGREDIENT_DATA, currentIngredient: null};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('INCREASE_INGREDIENT_COUNTER for BUN', () => {
        const action = {type: INCREASE_INGREDIENT_COUNTER, ingredient: {_id: '1', type: 'bun', name: 'bunny', counter: 1}};
        const state = {
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 2},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 2},
                {_id: '2', type: 'main', name: 'main 1', counter: 2},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('INCREASE_INGREDIENT_COUNTER for other type', () => {
        const action = {type: INCREASE_INGREDIENT_COUNTER, ingredient: {_id: '2', type: 'main', name: 'main 1', counter: 2}};
        const state = {
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 2},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 3},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('DECSEASE_INGREDIENT_COUNTER for BUN', () => {
        const action = {type: DECSEASE_INGREDIENT_COUNTER, ingredient: {_id: '1', type: 'bun', name: 'bunny', counter: 1}};
        const state = {
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 2},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 0},
                {_id: '2', type: 'main', name: 'main 1', counter: 2},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('DECSEASE_INGREDIENT_COUNTER for other type', () => {
        const action = {type: DECSEASE_INGREDIENT_COUNTER, ingredient: {_id: '2', type: 'main', name: 'main 1', counter: 2}};
        const state = {
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 2},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 1},
                {_id: '3', type: 'main', name: 'main 2', counter: 0}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

});