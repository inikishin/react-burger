import {initialState, feed} from './feed';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED
} from "../actions/feed";

describe('Testing feed reducer', () => {

    // TODO Вернуть после комментариев ментора
    // it('initialState', () => {
    //     expect(feed(undefined, {})).toEqual({
    //         total: 0,
    //         totalToday: 0,
    //         wsConnected: false,
    //         messages: [],
    //         orders: [],
    //         error: ''
    //     });
    // });

    it('WS_CONNECTION_SUCCESS', () => {
        const action = {type: WS_CONNECTION_SUCCESS};
        expect(feed(initialState, action)).toEqual({
            total: 0,
            totalToday: 0,
            wsConnected: true,
            messages: [],
            orders: [],
            error: ''
        });
    });

    it('WS_CONNECTION_ERROR', () => {
        const action = {type: WS_CONNECTION_ERROR, payload: 'Error text'};
        expect(feed(initialState, action)).toEqual({
            total: 0,
            totalToday: 0,
            wsConnected: false,
            messages: [],
            orders: [],
            error: 'Error text'
        });
    });

    it('WS_GET_MESSAGE', () => {
        const action = {
            type: WS_GET_MESSAGE, payload: {
                orders: ['order 1', 'order 2'],
                total: 2,
                totalToday: 1
            }
        };
        expect(feed(initialState, action)).toEqual({
            total: 2,
            totalToday: 1,
            wsConnected: false,
            messages: [{
                orders: ['order 1', 'order 2'],
                total: 2,
                totalToday: 1
            }],
            orders: ['order 1', 'order 2'],
            error: ""
        });
    });

    it('WS_CONNECTION_CLOSED', () => {
        const action = {type: WS_CONNECTION_CLOSED};
        expect(feed(initialState, action)).toEqual({
            total: 0,
            totalToday: 0,
            wsConnected: false,
            messages: [],
            orders: [],
            error: ""
        });
    });


});