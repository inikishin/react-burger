import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_CLOSED,
    TFeedActions
} from "../actions/feed";
import {AppDispatch, AppThunk} from "../../types";
import {Middleware} from "redux";
import {TRootState} from "../reducers";

export const socketMiddleware = (): Middleware => {
    return (store: { dispatch: AppDispatch }) => {

        let socket: WebSocket | null = null;
        return ((next: (arg0: TFeedActions) => void) => (action: TFeedActions) => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === WS_CONNECTION_START) {
                if (socket) {
                    socket.close(1000, 'reconnect needed');
                }
                if (!payload) {
                    socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');
                }
                else
                {
                    socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${payload}`);
                }
            };

            if (socket) {
                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: undefined});
                };

                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event.toString()});
                };

                socket.onmessage = event => {
                    const parsedData = JSON.parse(event.data);
                    dispatch({type: WS_GET_MESSAGE, payload: parsedData});
                };

                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: undefined});
                };

                if (type === WS_SEND_MESSAGE) {
                    socket.send(JSON.stringify(payload));
                }
            }
            next(action);
        })
    }
}