import {feed, initialState} from './feed';
import {
    TFeedActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/feed";

describe('Testing feed reducer', () => {

    it('initialState', () => {
        expect(feed(undefined, {} as TFeedActions)).toEqual({
            total: 0,
            totalToday: 0,
            wsConnected: false,
            messages: [],
            orders: [],
            error: ''
        });
    });

    it('WS_CONNECTION_SUCCESS', () => {
        const action: TFeedActions = {type: WS_CONNECTION_SUCCESS, payload: undefined};
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
        const action: TFeedActions = {type: WS_CONNECTION_CLOSED, payload: undefined};
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