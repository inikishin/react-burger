import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from "../actions/auth";
import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED} from "../actions/auth";
import {REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED} from "../actions/auth";
import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED} from "../actions/auth";
import {SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILED} from "../actions/auth";
import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from "../actions/auth";
import {RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED} from "../actions/auth";
import {SET_NEW_PASSWORD_REQUEST, SET_NEW_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILED} from "../actions/auth";
import {deleteCookie, setCookie} from "../../utils/cookies";

import type { TAuthActions } from '../actions/auth';

type TUser = {
    name: string,
    email: string,
    password: string
};
type TAuthState = {
    user: TUser,
    isAuthenticated: boolean,
    isLoading: boolean,
    hasError: boolean,
    tokenExpired: boolean
}

export const initialState: TAuthState = {
    user: {name: '', email: '', password: ''},
    isAuthenticated: false,
    isLoading: false,
    hasError: false,
    tokenExpired: false
}

export const auth = (state = initialState, action: TAuthActions): TAuthState => {

    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, isLoading: true, hasError: false, isAuthenticated: false,}
        }
        case LOGIN_SUCCESS: {
            if (action.data.accessToken) {
                setCookie('token', action.data.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', action.data.refreshToken);
            }

            return {...state, isLoading: false, isAuthenticated: true, user: action.data.user}
        }
        case LOGIN_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        case LOGOUT_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case LOGOUT_SUCCESS: {
            deleteCookie('token');
            deleteCookie('refreshToken');

            return {...state, isLoading: false, isAuthenticated: false, user: initialState.user}
        }
        case LOGOUT_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        case REGISTER_USER_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case REGISTER_USER_SUCCESS: {
            if (action.data.accessToken) {
                setCookie('token', action.data.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', action.data.refreshToken);
            }

            return {...state, isLoading: false, isAuthenticated: true, user: action.data.user}
        }
        case REGISTER_USER_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        case GET_USER_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case GET_USER_SUCCESS: {
            return {...state, isAuthenticated: true, isLoading: false, user: action.data.user}
        }
        case GET_USER_FAILED: {
            return {...state, isLoading: false, hasError: true, tokenExpired: true};
        }

        case SET_USER_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case SET_USER_SUCCESS: {
            return {...state, isLoading: false, user: action.data.user}
        }
        case SET_USER_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        case REFRESH_TOKEN_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case REFRESH_TOKEN_SUCCESS: {
            if (action.data.accessToken) {
                setCookie('token', action.data.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', action.data.refreshToken);
            }

            return {...state, isLoading: false, tokenExpired: false}
        }
        case REFRESH_TOKEN_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        case RESET_PASSWORD_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, isLoading: false}
        }
        case RESET_PASSWORD_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        case SET_NEW_PASSWORD_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case SET_NEW_PASSWORD_SUCCESS: {
            return {...state, isLoading: false}
        }
        case SET_NEW_PASSWORD_FAILED: {
            return {...state, isLoading: false, hasError: true};
        }

        default: {
            return state;
        }
    }
}