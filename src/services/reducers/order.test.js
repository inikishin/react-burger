import {initialState, order} from "./order";

import {
    ADD_INGREDIENT_TO_BURGER,
    CHANGE_INGREDIENT_IN_BURGER,
    DELETE_INGREDIENT_FROM_BURGER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../actions/order";

describe('Testing order reducer', () => {

    it('initialState', () => {
        expect(order(undefined, {})).toEqual({
            currentBurger: {bun: {}, main: [], total: 0},
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('ADD_INGREDIENT_TO_BURGER for BUN', () => {
        const action = {type: ADD_INGREDIENT_TO_BURGER, ingredient: {_id: '1', type: 'bun', name: 'bunny', price: 100}}
        expect(order(initialState, action)).toEqual({
            currentBurger: {bun: {_id: '1', type: 'bun', name: 'bunny', price: 100}, main: [], total: 200},
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('CHANGE_INGREDIENT_IN_BURGER', () => {
        const action = {type: CHANGE_INGREDIENT_IN_BURGER, oldIndex: 0, currentIndex: 2};
        const state = {
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100}, main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100},
                    {_id: '3', type: 'main', name: 'main 2', price: 100},
                    {_id: '4', type: 'main', name: 'main 3', price: 100}
                ], total: 500
            },
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        };

        expect(order(state, action)).toEqual({
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100},
                main: [

                    {_id: '3', type: 'main', name: 'main 2', price: 100},
                    {_id: '4', type: 'main', name: 'main 3', price: 100},
                    {_id: '2', type: 'main', name: 'main 1', price: 100},
                ], total: 500
            },
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('DELETE_INGREDIENT_FROM_BURGER', () => {
        const action = {type: DELETE_INGREDIENT_FROM_BURGER, ingredientIndex: 1};
        const state = {
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100}, main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100},
                    {_id: '3', type: 'main', name: 'main 2', price: 100},
                    {_id: '4', type: 'main', name: 'main 3', price: 100}
                ], total: 500
            },
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        };

        expect(order(state, action)).toEqual({
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100},
                main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100},
                    {_id: '4', type: 'main', name: 'main 3', price: 100},

                ], total: 400
            },
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('GET_ORDER_NUMBER_REQUEST', () => {
        const action = {type: GET_ORDER_NUMBER_REQUEST};
        expect(order(initialState, action)).toEqual({
            currentBurger: {bun: {}, main: [], total: 0},
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: true, hasErrorOrderNumber: false}
        });
    });

    it('GET_ORDER_NUMBER_FAILED', () => {
        const action = {type: GET_ORDER_NUMBER_FAILED};
        expect(order(initialState, action)).toEqual({
            currentBurger: {bun: {}, main: [], total: 0},
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: true}
        });
    });

    it('GET_ORDER_NUMBER_SUCCESS', () => {
        const action = {type: GET_ORDER_NUMBER_SUCCESS, orderNumber: 999999};
        const state = {
            currentBurger: {
                bun: {_id: '1', type: 'bun', name: 'bunny', price: 100}, main: [
                    {_id: '2', type: 'main', name: 'main 1', price: 100},
                    {_id: '3', type: 'main', name: 'main 2', price: 100},
                    {_id: '4', type: 'main', name: 'main 3', price: 100}
                ], total: 500
            },
            currentIngredient: {},
            order: {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        };

        expect(order(state, action)).toEqual({
            currentBurger: {
                bun: {},
                main: [],
                total: 0
            },
            currentIngredient: {},
            order: {number: 999999, isLoadingOrderNumber: false, hasErrorOrderNumber: false}
        });
    });

    it('ADD_INGREDIENT_TO_BURGER for other', () => {
        const action = {type: ADD_INGREDIENT_TO_BURGER, ingredient: {_id: '1', type: 'main', name: 'main 1', price: 100}};
        const initialStateFake = initialState;
        const returnValue = order(initialStateFake, action);
        expect(returnValue.currentBurger.main[0]).toHaveProperty('price', 100);
        expect(returnValue.currentBurger.main[0]).toHaveProperty('name', 'main 1');
        expect(returnValue.currentBurger.main[0]).toHaveProperty('key');
        expect(returnValue.currentBurger).toHaveProperty('total', 100);
        expect(returnValue).toHaveProperty('currentIngredient', {});
        expect(returnValue).toHaveProperty('order', {number: 0, isLoadingOrderNumber: false, hasErrorOrderNumber: false});
    });

});