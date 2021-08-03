import { useContext, useState, createContext } from 'react';
import {deleteCookie, getCookie, setCookie} from '../utils/cookies';
import React from 'react';
import {loginRequest, getUserRequest, setUserRequest, logoutRequest, registerRequest, refreshTokenRequest, passwordReset, passwordResetReset} from './handleApi';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        return await getUserRequest()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setUser({...data.user, id: data.user._id});
                }
                return data.success;
            })
            .catch(e => console.log(e));
    };

    const setUserAttributes = async (form) => {
        return await setUserRequest(form)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setUser({...data.user, id: data.user._id});
                }
                return data.success;
            })
            .catch(e => console.log(e));
    };

    const signIn = async form => {
        const data = await loginRequest(form)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.accessToken) {
                    setCookie('token', data.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', data.refreshToken);
                }
                return data;
            })
            .catch(e => console.log(e));

        if (data.success) {
            setUser({...data.user});
        }
    };

    const register = async (form) => {
        const data = await registerRequest(form)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    setCookie('token', data.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', data.refreshToken);
                }
                return data;
            })
            .catch(e => console.log(e));
        if (data.success) {
            setUser({...data.user});
        }
    };

    const refreshToken = async () => {
        const data = await refreshTokenRequest({token: getCookie('refreshToken')})
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setCookie('token', data.accessToken.split('Bearer ')[1]);
                    setCookie('refreshToken', data.refreshToken);
                }
            })
            .catch(e => console.log(e));
    }

    const signOut = async () => {
        await logoutRequest({token: getCookie('refreshToken')}).catch(e => console.log(e));
        setUser(null);
        deleteCookie('token');
        deleteCookie('refreshToken');
    };

    const reset = async form => {
        console.log(form);
        const data = await passwordReset(form)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data.success;
            })
            .catch(e => console.log(e));
    };

    const resetNewPassword = async form => {
        console.log(form);
        const data = await passwordResetReset(form)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return data.success;
            })
            .catch(e => console.log(e));
    };

    return {
        user,
        getUser,
        setUserAttributes,
        register,
        signIn,
        refreshToken,
        signOut,
        reset,
        resetNewPassword
    };
}
