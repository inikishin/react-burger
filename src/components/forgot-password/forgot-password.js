import React, {useCallback, useState} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useAuth} from "../../services/auth";


function ForgotPassword() {
    let auth = useAuth();
    let history = useHistory();

    const [form, setValue] = useState({ email: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    let reset = useCallback(
        e => {
            console.log(form);
            e.preventDefault();
            let res = auth.reset(form);

            history.replace('/reset-password');
        },
        [auth, form]
    );

    if (auth.user) {
        return (<Redirect to={{pathname: '/'}} />);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <form>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="Укажите e-mail" name="email" onChange={onChange} />
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20" onClick={reset}>Восстановить</Button>
                    </div>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили пароль?
                    <Link to="/login" className={styles.navLinks} onClick={reset}>Войти</Link></p>
            </div>
        </div>
    );
}

export default ForgotPassword;