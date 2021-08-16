import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED
} from "../actions/feed";

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected:false,
    messages: [],
    error: ''
}

export const feed = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: null,
                wsConnected: true
            };
        }

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: null,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                error: null,
                messages: state.messages.length
                    ? [...state.messages, action.payload]
                    : [action.payload],
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };

        default: {
            return state;
        }
    }
}