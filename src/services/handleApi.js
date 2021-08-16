import {getCookie} from '../utils/cookies';

export const getIngredientRequest = async () => {
    return await fetch('https://norma.nomoreparties.space/api/ingredients');
}

export const getOrderNumberRequest = async (ingredientsIds) => {
    return await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({ingredients: ingredientsIds})
    });
}


export const deserializeQuery = (query, noQuestionMark = false) => {
    const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
    const array = pairs.map(elem => elem.split('='));
    return Object.fromEntries(array);
};

export const serializeQuery = queryParams =>
    Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
        if (typeof value === 'undefined') {
            return acc;
        }
        const postfix = index === array.length - 1 ? '' : '&';
        return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
    }, '?');

export const loginRequest = async form => {
    return await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const registerRequest = async form => {
    return await fetch('https://norma.nomoreparties.space/api/auth/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const refreshTokenRequest = async (refreshToken) =>
    await fetch('https://norma.nomoreparties.space/api/auth/token', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(refreshToken)
    });

export const getUserRequest = async () =>
    await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

export const setUserRequest = async (form) =>
    await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });

export const logoutRequest = async (refreshToken) => {
    console.log(JSON.stringify(refreshToken));
    return await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(refreshToken)
    });
};

export const passwordReset = async (form) => {
    return await fetch('https://norma.nomoreparties.space/api/password-reset', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const passwordResetReset = async (form) => {
    return await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};