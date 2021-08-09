import React, {useCallback, useState} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import { resetPassword as resetPasswordAuth } from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";


function ForgotPassword() {
    const dispatch = useDispatch();
    const auth = useSelector(store => ({...store.auth}));
    const history = useHistory();

    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    let reset = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPasswordAuth(form));
            history.replace('/reset-password');
        },
        [auth, form]
    );

    if (auth.isAuthenticated) {
        return (<Redirect to={{pathname: '/'}} />);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <form onSubmit={reset}>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="Укажите e-mail" name="email" onChange={onChange} value={form.email}/>
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20">Восстановить</Button>
                    </div>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?
                    <Link to="/login" className={styles.navLinks}>Войти</Link></p>
            </div>
        </div>
    );
}

export default ForgotPassword;