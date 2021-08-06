import {loginRequest, getUserRequest, setUserRequest, logoutRequest, registerRequest, refreshTokenRequest,
passwordReset as resetPasswordRequest, passwordResetReset} from "../handleApi";
import {getCookie} from "../../utils/cookies";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST';
export const SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS';
export const SET_NEW_PASSWORD_FAILED = 'SET_NEW_PASSWORD_FAILED';

export function login(form) {
    return function (dispatch) {

        dispatch({
            type: LOGIN_REQUEST
        });

        loginRequest(form).then(res => {
            //TODO delete
            console.log('actions, res from login api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from login api')
            console.log(data);

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
    return function (dispatch) {

        dispatch({
            type: LOGOUT_REQUEST
        });

        logoutRequest({token: getCookie('refreshToken')}).then(res => {
            //TODO delete
            console.log('actions, res from logout api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from logout api')
            console.log(data);

            dispatch({type: LOGOUT_SUCCESS});
        }).catch(e => {
                dispatch({
                    type: LOGOUT_FAILED,
                    error: e
                });
            });
    }
}

export function register(form) {
    return function (dispatch) {

        dispatch({
            type: REGISTER_USER_REQUEST
        });

        registerRequest(form).then(res => {
            //TODO delete
            console.log('actions, res from register api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from register api')
            console.log(data);

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
    return function (dispatch) {

        dispatch({
            type: GET_USER_REQUEST
        });

        getUserRequest().then(res => {
            //TODO delete
            console.log('actions, res from getuser api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from getuser api')
            console.log(data);

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

export function setUserAttributes(form) {
    return function (dispatch) {
        console.log('SET_USER_REQUEST');
        dispatch({
            type: SET_USER_REQUEST,
        });
        console.log('SET_USER_REQUEST');
        setUserRequest(form).then(res => {
            //TODO delete
            console.log('actions, res from setuser api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from setuser api')
            console.log(data);

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
    return function (dispatch) {

        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });

        refreshTokenRequest().then(res => {
            //TODO delete
            console.log('actions, res from refreshToken api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from refreshToken api')
            console.log(data);

            dispatch({type: REFRESH_TOKEN_SUCCESS, data: data});
        }).catch(e => {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                    error: e
                });
            });
    }
}

export function resetPassword(form) {
    return function (dispatch) {

        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        resetPasswordRequest(form).then(res => {
            //TODO delete
            console.log('actions, res from reset api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from reset api')
            console.log(data);

            dispatch({type: RESET_PASSWORD_SUCCESS, data: data});
        }).catch(e => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    error: e
                });
            });
    }
}

export function resetSetNewPassword(form) {
    return function (dispatch) {

        dispatch({
            type: SET_NEW_PASSWORD_REQUEST
        });

        passwordResetReset(form).then(res => {
            //TODO delete
            console.log('actions, res from set new api')
            console.log(res);

            if (res && res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error: ${res.status}`);
            }
        }).then((data) => {
            //TODO delete
            console.log('actions, data from set new api')
            console.log(data);

            dispatch({type: SET_NEW_PASSWORD_SUCCESS});
        }).catch(e => {
                dispatch({
                    type: SET_NEW_PASSWORD_FAILED,
                    error: e
                });
            });
    }
}