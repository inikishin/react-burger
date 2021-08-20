import {loginRequest, getUserRequest, setUserRequest, logoutRequest, registerRequest, refreshTokenRequest,
passwordReset as resetPasswordRequest, passwordResetReset} from "../handleApi";
import {getCookie} from "../../utils/cookies";

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const SET_USER_REQUEST: 'SET_USER_REQUEST' = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS: 'SET_USER_SUCCESS' = 'SET_USER_SUCCESS';
export const SET_USER_FAILED: 'SET_USER_FAILED' = 'SET_USER_FAILED';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

export const SET_NEW_PASSWORD_REQUEST: 'SET_NEW_PASSWORD_REQUEST' = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS' = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED: 'SET_NEW_PASSWORD_FAILED' = 'SET_NEW_PASSWORD_FAILED';

type TAuthRespond = {accessToken: string, refreshToken: string, user: {name: string, email: string, password: string}};

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly data: TAuthRespond;
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly data: TAuthRespond;
}
export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly data: TAuthRespond;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface ISetUserRequestAction {
  readonly type: typeof SET_USER_REQUEST;
}
export interface ISetUserSuccessAction {
  readonly type: typeof SET_USER_SUCCESS;
  readonly data: TAuthRespond;
}
export interface ISetUserFailedAction {
  readonly type: typeof SET_USER_FAILED;
}

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly data: TAuthRespond;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface ISetNewPasswordRequestAction {
  readonly type: typeof SET_NEW_PASSWORD_REQUEST;
}
export interface ISetNewPasswordSuccessAction {
  readonly type: typeof SET_NEW_PASSWORD_SUCCESS;
}
export interface ISetNewPasswordFailedAction {
  readonly type: typeof SET_NEW_PASSWORD_FAILED;
}

export type TAuthActions =
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutSuccessAction
    | ILogoutRequestAction
    | ILogoutFailedAction
    | IRegisterUserRequestAction
    | IRegisterUserSuccessAction
    | IRegisterUserFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | ISetUserRequestAction
    | ISetUserSuccessAction
    | ISetUserFailedAction
    | IRefreshTokenRequestAction
    | IRefreshTokenSuccessAction
    | IRefreshTokenFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | ISetNewPasswordRequestAction
    | ISetNewPasswordSuccessAction
    | ISetNewPasswordFailedAction;

interface ILoginForm {
    email: string,
    password: string
};

export function login(form: ILoginForm) {
    return function (dispatch: any) {

        dispatch({
            type: LOGIN_REQUEST
        });

        loginRequest(form).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            if (data.accessToken) {
                dispatch({type: LOGIN_SUCCESS, data: data});
            }
            else {
                throw new Error("No data");
            }
        }).catch(e => {
                dispatch({
                    type: LOGIN_FAILED,
                    error: e
                });
            });
    }
}

export function logout() {
    return function (dispatch: any) {

        dispatch({
            type: LOGOUT_REQUEST
        });

        logoutRequest({token: getCookie('refreshToken')}).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            dispatch({type: LOGOUT_SUCCESS});
        }).catch(e => {
                dispatch({
                    type: LOGOUT_FAILED,
                    error: e
                });
            });
    }
}

interface IRegisterForm {
    email: string,
    name: string,
    password: string
};

export function register(form: IRegisterForm) {
    return function (dispatch: any) {

        dispatch({
            type: REGISTER_USER_REQUEST
        });

        registerRequest(form).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            if (data.accessToken) {
                dispatch({type: REGISTER_USER_SUCCESS, data: data});
            }
            else {
                throw new Error("No data");
            }
        }).catch(e => {
                dispatch({
                    type: REGISTER_USER_FAILED,
                    error: e
                });
            });
    }
}

export function getUser() {
    return function (dispatch: any) {

        dispatch({
            type: GET_USER_REQUEST
        });

        getUserRequest().then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            if (data.user) {
                dispatch({type: GET_USER_SUCCESS, data: data});
            }
            else {
                throw new Error("No data");
            }
        }).catch(e => {
                dispatch({
                    type: GET_USER_FAILED,
                    error: e
                });
            });
    }
}

export function setUserAttributes(form: IRegisterForm) {
    return function (dispatch: any) {
        dispatch({
            type: SET_USER_REQUEST,
        });
        setUserRequest(form).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            if (data.user) {
                dispatch({type: SET_USER_SUCCESS, data: data});
            }
            else {
                throw new Error("No data");
            }
        }).catch(e => {
                dispatch({
                    type: SET_USER_FAILED,
                    error: e
                });
            });
    }
}

export function refreshToken() {
    return function (dispatch: any) {

        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });

        refreshTokenRequest({token: getCookie('refreshToken')}).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            dispatch({type: REFRESH_TOKEN_SUCCESS, data: data});
        }).catch(e => {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                    error: e
                });
            });
    }
}

interface IPasswordResetForm {
    email: string
}

export function resetPassword(form: IPasswordResetForm) {
    return function (dispatch: any) {

        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        resetPasswordRequest(form).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            dispatch({type: RESET_PASSWORD_SUCCESS, data: data});
        }).catch(e => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    error: e
                });
            });
    }
}

interface IPasswordResetResetForm {
    password: string,
    token: string
}

export function resetSetNewPassword(form: IPasswordResetResetForm) {
    return function (dispatch: any) {

        dispatch({
            type: SET_NEW_PASSWORD_REQUEST
        });

        passwordResetReset(form).then(res => {
            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            dispatch({type: SET_NEW_PASSWORD_SUCCESS});
        }).catch(e => {
                dispatch({
                    type: SET_NEW_PASSWORD_FAILED,
                    error: e
                });
            });
    }
}