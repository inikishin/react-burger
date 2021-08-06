import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from "../actions/auth";
import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED} from "../actions/auth";
import {REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED} from "../actions/auth";
import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED} from "../actions/auth";
import {SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILED} from "../actions/auth";
import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from "../actions/auth";
import {RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED} from "../actions/auth";
import {SET_NEW_PASSWORD_REQUEST, SET_NEW_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILED} from "../actions/auth";
import {deleteCookie, setCookie} from "../../utils/cookies";

const initialState = {
    user: {name: '', email: '', password: ''},
    isAuthenticated: false,
    isLoading: false,
    hasError: false
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {...state, isLoading: true, hasError: false, isAuthenticated: false,}
        }
        case LOGIN_SUCCESS: {
            // TODO delete
            console.log('reducer: LOGIN_SUCCESS');
            console.log(action.data);

            if (action.data.accessToken) {
                setCookie('token', action.data.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', action.data.refreshToken);
            }

            return {...state, isLoading: false, isAuthenticated: true, user: action.data.user}
        }
        case LOGIN_FAILED: {
            console.log('Request error:');
            console.log(action.error);
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
            console.log('LOGOUT_FAILED error:');
            console.log(action.error);
            return {...state, isLoading: false, hasError: true};
        }

        case REGISTER_USER_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case REGISTER_USER_SUCCESS: {
            // TODO delete
            console.log('reducer: REGISTER_USER_SUCCESS');
            console.log(action.data);

            if (action.data.accessToken) {
                setCookie('token', action.data.accessToken.split('Bearer ')[1]);
                setCookie('refreshToken', action.data.refreshToken);
            }

            return {...state, isLoading: false, isAuthenticated: true, user: action.data.user}
        }
        case REGISTER_USER_FAILED: {
            console.log('Request error:');
            console.log(action.error);
            return {...state, isLoading: false, hasError: true};
        }

        case GET_USER_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case GET_USER_SUCCESS: {
            // TODO delete
            console.log('reducer: GET_USER_SUCCESS');
            console.log(action.data);

            return {...state, isLoading: false, user: action.data.user}
        }
        case GET_USER_FAILED: {
            console.log('GET_USER_FAILED error:');
            console.log(action.error);
            return {...state, isLoading: false, hasError: true};
        }

        case SET_USER_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case SET_USER_SUCCESS: {
            // TODO delete
            console.log('reducer: SET_USER_SUCCESS');
            console.log(action.data);

            return {...state, isLoading: false, user: action.data.user}
        }
        case SET_USER_FAILED: {
            console.log('SET_USER_FAILED error:');
            console.log(action.error);
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

            return {...state, isLoading: false}
        }
        case REFRESH_TOKEN_FAILED: {
            console.log('REFRESH_TOKEN_FAILED error:');
            console.log(action.error);
            return {...state, isLoading: false, hasError: true};
        }

        case RESET_PASSWORD_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case RESET_PASSWORD_SUCCESS: {
            return {...state, isLoading: false}
        }
        case RESET_PASSWORD_FAILED: {
            console.log('RESET_PASSWORD_FAILED error:');
            console.log(action.error);
            return {...state, isLoading: false, hasError: true};
        }

        case SET_NEW_PASSWORD_REQUEST: {
            return {...state, isLoading: true, hasError: false}
        }
        case SET_NEW_PASSWORD_SUCCESS: {
            return {...state, isLoading: false}
        }
        case SET_NEW_PASSWORD_FAILED: {
            console.log('SET_NEW_PASSWORD_FAILED error:');
            console.log(action.error);
            return {...state, isLoading: false, hasError: true};
        }

        default: {
            return state;
        }
    }
}