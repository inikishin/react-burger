import React, {useCallback, useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import { resetSetNewPassword } from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";


function ResetPassword() {

    const dispatch = useDispatch();
    const auth = useSelector(store => ({...store.auth}));
    const history = useHistory();

    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const resetNewPassword = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetSetNewPassword(form));
            if (!auth.hasError) {
                history.replace('/login');
            }
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
                <form onSubmit={resetNewPassword}>
                    <div className={styles.inputContainer}>
                        <PasswordInput type="password" placeholder="Введите новый пароль" name="password"
                                       icon={'ShowIcon'} onChange={onChange} value={form.password}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="Введите код из письма" name="token" onChange={onChange}
                               value={form.token}/>
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20">Сохранить</Button>
                    </div>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили
                    пароль? <Link to="/login" className={styles.navLinks}>Войти</Link></p>
            </div>
        </div>
    );
}

export default ResetPassword;