import React, {useState, useCallback} from 'react';
import styles from './login.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import { login as loginAuth } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {TRootState} from "../../services/reducers";


function Login() {
    const location = useLocation();
    const dispatch = useDispatch();
    const auth = useSelector((store:TRootState) => ({...store.auth}));

    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = (e: { target: { name: any; value: any; }; }) => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const login = useCallback(
        e => {
            e.preventDefault();
            dispatch(loginAuth(form));
        },
        [auth, form]
    );

    if (auth.isAuthenticated) {
        // @ts-ignore
        const redirectPath = location.state ? location.state.from.pathname : '/';
        // @ts-ignore
        return (<Redirect to={{pathname: redirectPath, state: {background: location.state && location.state.from}}} />);
    }

    // @ts-ignore
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
                <form onSubmit={login}>
                    <div className={styles.inputContainer} id="input-email">
                        <Input type="text" placeholder="E-mail" name="email" onChange={onChange} value={form.email}/>
                    </div>
                    <div id="input-password" className={styles.inputContainer}>
                        <PasswordInput name="password"
                                       onChange={onChange} value={form.password}/>
                    </div>
                    <div className="mb-20">
                        <Button size="medium">Войти</Button>
                    </div>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый
                    пользователь? <Link to="/register" className={styles.navLinks}>Зарегистрироваться</Link></p>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to="/forgot-password"
                    className={styles.navLinks}>Восстановить пароль</Link></p>
            </div>
        </div>
    );
}

export default Login;