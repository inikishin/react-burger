import {WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_CONNECTION_CLOSED} from "../actions/feed";

export const socketMiddleware = () => {
    return store => {
        let socket = null;
        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === WS_CONNECTION_START) {
                if (socket) {
                    socket.close('1000', 'reconnect needed');
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
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event});
                };

                socket.onmessage = event => {
                    const parsedData = JSON.parse(event.data);
                    dispatch({type: WS_GET_MESSAGE, payload: parsedData});
                };

                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: event});
                };

                if (type === WS_SEND_MESSAGE) {
                    socket.send(JSON.stringify(payload));
                }
            }
            next(action);
        }
    }
}