import {initialState, ingredients, TIngredientsState} from "./ingredients";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA,
    INCREASE_INGREDIENT_COUNTER,
    DECSEASE_INGREDIENT_COUNTER,
    TIngredientsActions
} from '../actions/ingredients';

describe('Testing ingredients reducer', () => {

    // TODO Вернуть после комментариев ментора
    // it('initialState', () => {
    //     expect(ingredients(undefined, {})).toEqual({
    //         ingredients: [],
    //         isLoadingIngredients: false,
    //         hasErrorIngredients: false,
    //         currentIngredient: null
    //     });
    // });

    it('GET_INGREDIENTS_REQUEST', () => {
        const action: TIngredientsActions = {type: GET_INGREDIENTS_REQUEST};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: true,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('GET_INGREDIENTS_SUCCESS', () => {
        const action: TIngredientsActions = {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: [{
                name: 'ingredient 1',
                _id: '1',
                type: 'bun',
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1
            }, {
                name: 'ingredient 2', _id: '2',
                type: 'bun',
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1
            }]
        };

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [{name: 'ingredient 1', _id: '1',
                type: 'bun',
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1}, {name: 'ingredient 2', _id: '2',
                type: 'bun',
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1}],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('GET_INGREDIENTS_FAILED', () => {
        const action: TIngredientsActions = {type: GET_INGREDIENTS_FAILED};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: true,
            currentIngredient: null
        });
    });

    it('ADD_INGREDIENT_DATA', () => {
        const action: TIngredientsActions = {
            type: ADD_INGREDIENT_DATA, currentIngredient: {
                _id: '1', name: 'ingridient',
                type: 'bun',
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1
            }
        };

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: {_id: '1', name: 'ingridient', type: 'bun',
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1}
        });
    });

    it('DELETE_INGREDIENT_DATA', () => {
        const action: TIngredientsActions = {type: DELETE_INGREDIENT_DATA};

        expect(ingredients(initialState, action)).toEqual({
            ingredients: [],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('INCREASE_INGREDIENT_COUNTER for BUN', () => {
        const action: TIngredientsActions = {
            type: INCREASE_INGREDIENT_COUNTER,
            ingredient: {
                _id: '1', type: 'bun', name: 'bunny', counter: 1,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1
            }
        };
        const state: TIngredientsState = {
            ingredients: [
                {
                    _id: '1', type: 'bun', name: 'bunny', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '2', type: 'main', name: 'main 1', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                }
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('INCREASE_INGREDIENT_COUNTER for other type', () => {
        const action: TIngredientsActions = {
            type: INCREASE_INGREDIENT_COUNTER,
            ingredient: {
                _id: '2', type: 'main', name: 'main 1', counter: 2,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1
            }
        };
        const state: TIngredientsState = {
            ingredients: [
                {
                    _id: '1', type: 'bun', name: 'bunny', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '2', type: 'main', name: 'main 1', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                }
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 3,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('DECSEASE_INGREDIENT_COUNTER for BUN', () => {
        const action: TIngredientsActions = {
            type: DECSEASE_INGREDIENT_COUNTER,
            ingredient: {
                _id: '1', type: 'bun', name: 'bunny', counter: 1,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1
            }
        };
        const state: TIngredientsState = {
            ingredients: [
                {
                    _id: '1', type: 'bun', name: 'bunny', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '2', type: 'main', name: 'main 1', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                }
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

    it('DECSEASE_INGREDIENT_COUNTER for other type', () => {
        const action: TIngredientsActions = {
            type: DECSEASE_INGREDIENT_COUNTER,
            ingredient: {_id: '2', type: 'main', name: 'main 1', counter: 2,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                price: 1,
                proteins: 1}
        };
        const state: TIngredientsState = {
            ingredients: [
                {
                    _id: '1', type: 'bun', name: 'bunny', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '2', type: 'main', name: 'main 1', counter: 2,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                },
                {
                    _id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1
                }
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        };

        expect(ingredients(state, action)).toEqual({
            ingredients: [
                {_id: '1', type: 'bun', name: 'bunny', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '2', type: 'main', name: 'main 1', counter: 1,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1},
                {_id: '3', type: 'main', name: 'main 2', counter: 0,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    price: 1,
                    proteins: 1}
            ],
            isLoadingIngredients: false,
            hasErrorIngredients: false,
            currentIngredient: null
        });
    });

});
