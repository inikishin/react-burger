export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type TFeedRespond = {
  orders: Array<any>
  total: number,
  totalToday: number
};

export interface IConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START,
  readonly payload: undefined;
}
export interface IConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS,
  readonly payload: undefined;
}
export interface IConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR,
  readonly payload: string;
}
export interface IConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED,
  readonly payload: undefined;
}
export interface IGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE,
  readonly payload: TFeedRespond
}
export interface ISendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE,
  readonly payload: undefined;
}

export type TFeedActions =
    | IConnectionStartAction
    | IConnectionSuccessAction
    | IConnectionErrorAction
    | IConnectionClosedAction
    | IGetMessageAction
    | ISendMessageAction;
