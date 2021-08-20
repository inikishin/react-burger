import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED,
    TFeedActions
} from "../actions/feed";

type TFeedState = {
    orders: Array<any>,
    total: number,
    totalToday: number,
    wsConnected: boolean,
    messages: Array<any>,
    error: string
};

export const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected:false,
    messages: [],
    error: ''
}

export const feed = (state = initialState, action: TFeedActions) => {
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