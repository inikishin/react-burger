import {getCookie} from '../utils/cookies';

export const getIngredientRequest = async () => {
    return await fetch('https://norma.nomoreparties.space/api/ingredients');
}

export const getOrderNumberRequest = async (ingredientsIds: Array<string>) => {
    return await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({ingredients: ingredientsIds})
    });
}

export const serializeQuery = (queryParams: any): string =>
    Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
        if (typeof value === 'undefined') {
            return acc;
        }
        const postfix = index === array.length - 1 ? '' : '&';
        // @ts-ignore
        return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
    }, '?');


interface ILoginForm {
    email: string,
    password: string
};

export const loginRequest = async (form: ILoginForm) => {
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

interface IRegisterForm {
    email: string,
    name: string,
    password: string
};

export const registerRequest = async (form: IRegisterForm) => {
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

export const refreshTokenRequest = async (refreshToken: { token: string | undefined }) =>
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



export const setUserRequest = async (form: IRegisterForm) =>
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

export const logoutRequest = async (refreshToken: { token: string | undefined }) => {
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

interface IPasswordResetForm {
    email: string
}

export const passwordReset = async (form: IPasswordResetForm) => {
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

interface IPasswordResetResetForm {
    password: string,
    token: string
}

export const passwordResetReset = async (form: IPasswordResetResetForm) => {
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