import {initialState, order, TOrderState} from "./order";

import {
    ADD_INGREDIENT_TO_BURGER,
    CHANGE_INGREDIENT_IN_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    TOrderActions
} from "../actions/order";

describe('Testing order reducer', () => {

    it('initialState', () => {
        expect(order(undefined, {} as TOrderActions)).toEqual({
            currentBurger: {bun: null, main: [], total: 0},
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('ADD_INGREDIENT_TO_BURGER for BUN', () => {
        const action: TOrderActions = {
            type: ADD_INGREDIENT_TO_BURGER, ingredient: {
                _id: '1', type: 'bun', name: 'bunny', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1
            }, ingredientIndex: 0
        }
        expect(order(initialState, action)).toEqual({
            currentBurger: {bun: {_id: '1', type: 'bun', name: 'bunny', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1}, main: [], total: 200},
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('CHANGE_INGREDIENT_IN_BURGER', () => {
        const action: TOrderActions = {type: CHANGE_INGREDIENT_IN_BURGER, oldIndex: 0, currentIndex: 2};
        const state: TOrderState = {
            currentBurger: {
                bun: {
                    _id: '1', type: 'bun', name: 'bunny', price: 100,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    proteins: 1
                }, main: [
                    {
                        _id: '2', type: 'main', name: 'main 1', price: 100,
                        calories: 1,
                        carbohydrates: 1,
                        fat: 1,
                        image: 'some-img',
                        image_large: 'some-img',
                        image_mobile: 'some_img',
                        proteins: 1
                    },
                    {
                        _id: '3', type: 'main', name: 'main 2', price: 100,
                        calories: 1,
                        carbohydrates: 1,
                        fat: 1,
                        image: 'some-img',
                        image_large: 'some-img',
                        image_mobile: 'some_img',
                        proteins: 1
                    },
                    {
                        _id: '4', type: 'main', name: 'main 3', price: 100,
                        calories: 1,
                        carbohydrates: 1,
                        fat: 1,
                        image: 'some-img',
                        image_large: 'some-img',
                        image_mobile: 'some_img',
                        proteins: 1
                    }
                ], total: 500
            },
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        };

        expect(order(state, action)).toEqual({
            currentBurger: {
                bun: {
                    _id: '1', type: 'bun', name: 'bunny', price: 100,
                    calories: 1,
                    carbohydrates: 1,
                    fat: 1,
                    image: 'some-img',
                    image_large: 'some-img',
                    image_mobile: 'some_img',
                    proteins: 1
                },
                main: [

                    {
                        _id: '3', type: 'main', name: 'main 2', price: 100,
                        calories: 1,
                        carbohydrates: 1,
                        fat: 1,
                        image: 'some-img',
                        image_large: 'some-img',
                        image_mobile: 'some_img',
                        proteins: 1
                    },
                    {
                        _id: '4', type: 'main', name: 'main 3', price: 100,
                        calories: 1,
                        carbohydrates: 1,
                        fat: 1,
                        image: 'some-img',
                        image_large: 'some-img',
                        image_mobile: 'some_img',
                        proteins: 1
                    },
                    {
                        _id: '2', type: 'main', name: 'main 1', price: 100,
                        calories: 1,
                        carbohydrates: 1,
                        fat: 1,
                        image: 'some-img',
                        image_large: 'some-img',
                        image_mobile: 'some_img',
                        proteins: 1
                    },
                ], total: 500
            },
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('DELETE_INGREDIENT_FROM_BURGER', () => {
        const action: TOrderActions = {type: DELETE_INGREDIENT_FROM_BURGER, ingredientIndex: 1};
        const state: TOrderState = {
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1}, main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},
                    {_id: '3', type: 'main', name: 'main 2', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},
                    {_id: '4', type: 'main', name: 'main 3', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1}
                ], total: 500
            },
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        };

        expect(order(state, action)).toEqual({
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},
                main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},
                    {_id: '4', type: 'main', name: 'main 3', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},

                ], total: 400
            },
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('GET_ORDER_NUMBER_REQUEST', () => {
        const action: TOrderActions = {type: GET_ORDER_NUMBER_REQUEST};
        expect(order(initialState, action)).toEqual({
            currentBurger: {bun: null, main: [], total: 0},
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: true, hasErrorOrderNumber: false}
        });
    });

    it('GET_ORDER_NUMBER_FAILED', () => {
        const action: TOrderActions = {type: GET_ORDER_NUMBER_FAILED};
        expect(order(initialState, action)).toEqual({
            currentBurger: {bun: null, main: [], total: 0},
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: true}
        });
    });

    it('GET_ORDER_NUMBER_SUCCESS', () => {
        const action: TOrderActions = {type: GET_ORDER_NUMBER_SUCCESS, orderNumber: 999999};
        const state: TOrderState = {
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1}, main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},
                    {_id: '3', type: 'main', name: 'main 2', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1},
                    {_id: '4', type: 'main', name: 'main 3', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1}
                ], total: 500
            },
            currentIngredient: null,
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        };

        expect(order(state, action)).toEqual({
            currentBurger: {
                bun: null,
                main: [],
                total: 0
            },
            currentIngredient: null,
            order: {number: 999999, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('ADD_INGREDIENT_TO_BURGER for other', () => {
        const action: TOrderActions = {type: ADD_INGREDIENT_TO_BURGER, ingredient: {_id: '1', type: 'main', name: 'main 1', price: 100,
                calories: 1,
                carbohydrates: 1,
                fat: 1,
                image: 'some-img',
                image_large: 'some-img',
                image_mobile: 'some_img',
                proteins: 1}, ingredientIndex: 0};
        const initialStateFake = initialState;
        const returnValue = order(initialStateFake, action);
        expect(returnValue.currentBurger.main[0]).toHaveProperty('price', 100);
        expect(returnValue.currentBurger.main[0]).toHaveProperty('name', 'main 1');
        expect(returnValue.currentBurger.main[0]).toHaveProperty('key');
        expect(returnValue.currentBurger).toHaveProperty('total', 100);
        expect(returnValue).toHaveProperty('currentIngredient', null);
        expect(returnValue).toHaveProperty('order', {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false});
    });

});