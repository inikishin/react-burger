import {initialState, auth} from './auth';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from "../actions/auth";
import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED} from "../actions/auth";
import {REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED} from "../actions/auth";
import {GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED} from "../actions/auth";
import {SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_FAILED} from "../actions/auth";
import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED} from "../actions/auth";
import {RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED} from "../actions/auth";
import {SET_NEW_PASSWORD_REQUEST, SET_NEW_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILED} from "../actions/auth";
import {deleteCookie, setCookie} from "../../utils/cookies";

describe('Testing feed reducer', () => {

    it('initialState', () => {
        expect(auth(undefined, {})).toEqual({
            user: {name: '', email: '', password: ''},
            isAuthenticated: false,
            isLoading: false,
            hasError: false,
            tokenExpired: false
        });
    });

    it('LOGIN_REQUEST', () => {
        const action = {type: LOGIN_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('LOGIN_FAILED', () => {
        const action = {type: LOGIN_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('LOGIN_SUCCESS', () => {
        const action = {type: LOGIN_SUCCESS,
            data: {
                user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
                accessToken: 'Bearer xxx',
                refreshToken: 'yyy'
            }
        };

        expect(auth(initialState, action)).toEqual({
            user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
            isLoading: false, hasError: false, isAuthenticated: true,
            tokenExpired: false
        });
    });

    it('LOGOUT_REQUEST', () => {
        const action = {type: LOGOUT_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('LOGOUT_SUCCESS', () => {
        const action = {type: LOGOUT_SUCCESS};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('LOGOUT_FAILED', () => {
        const action = {type: LOGOUT_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('REGISTER_USER_REQUEST', () => {
        const action = {type: REGISTER_USER_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('REGISTER_USER_SUCCESS', () => {
        const action = {type: REGISTER_USER_SUCCESS, data: {
                user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
                accessToken: 'Bearer xxx',
                refreshToken: 'yyy'
            }};

        expect(auth(initialState, action)).toEqual({
            user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
            isLoading: false, hasError: false, isAuthenticated: true,
            tokenExpired: false
        });
    });

    it('REGISTER_USER_FAILED', () => {
        const action = {type: REGISTER_USER_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('GET_USER_REQUEST', () => {
        const action = {type: GET_USER_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('GET_USER_SUCCESS', () => {
        const action = {type: GET_USER_SUCCESS, data: {
                user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
                accessToken: 'Bearer xxx',
                refreshToken: 'yyy'
            }};

        expect(auth(initialState, action)).toEqual({
            user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
            isLoading: false, hasError: false, isAuthenticated: true,
            tokenExpired: false
        });
    });

    it('GET_USER_FAILED', () => {
        const action = {type: GET_USER_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: true
        });
    });

    it('SET_USER_REQUEST', () => {
        const action = {type: SET_USER_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('SET_USER_SUCCESS', () => {
        const action = {type: SET_USER_SUCCESS, data: {
                user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
                accessToken: 'Bearer xxx',
                refreshToken: 'yyy'
            }};

        expect(auth(initialState, action)).toEqual({
            user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
            isLoading: false, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('SET_USER_FAILED', () => {
        const action = {type: SET_USER_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('REFRESH_TOKEN_REQUEST', () => {
        const action = {type: REFRESH_TOKEN_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('REFRESH_TOKEN_SUCCESS', () => {
        const action = {type: REFRESH_TOKEN_SUCCESS, data: {
                user: {name: 'Jhon', email: 'jhon@yahoo.com', password: '******'},
                accessToken: 'Bearer xxx',
                refreshToken: 'yyy'
            }};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('REFRESH_TOKEN_FAILED', () => {
        const action = {type: REFRESH_TOKEN_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('RESET_PASSWORD_REQUEST', () => {
        const action = {type: RESET_PASSWORD_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('RESET_PASSWORD_SUCCESS', () => {
        const action = {type: RESET_PASSWORD_SUCCESS};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('RESET_PASSWORD_FAILED', () => {
        const action = {type: RESET_PASSWORD_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('SET_NEW_PASSWORD_REQUEST', () => {
        const action = {type: SET_NEW_PASSWORD_REQUEST};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: true, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('SET_NEW_PASSWORD_SUCCESS', () => {
        const action = {type: SET_NEW_PASSWORD_SUCCESS};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: false, isAuthenticated: false,
            tokenExpired: false
        });
    });

    it('SET_NEW_PASSWORD_FAILED', () => {
        const action = {type: SET_NEW_PASSWORD_FAILED};

        expect(auth(initialState, action)).toEqual({
            user: {name: '', email: '', password: ''},
            isLoading: false, hasError: true, isAuthenticated: false,
            tokenExpired: false
        });
    });


});


