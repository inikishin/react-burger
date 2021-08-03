import React, {useCallback, useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useAuth} from "../../services/auth";


function ResetPassword() {

    let history = useHistory();
    let auth = useAuth();

    const [form, setValue] = useState({ password: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    let resetNewPassword = useCallback(
        e => {
            e.preventDefault();
            let res = auth.resetNewPassword(form);
            if (res) {
                history.replace('/login');
            }
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
                        <PasswordInput type="password" placeholder="Введите новый пароль" name="password" icon={'ShowIcon'} onChange={onChange}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="Введите код из письма" name="token" onChange={onChange}/>
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20" onClick={resetNewPassword}>Сохранить</Button>
                    </div>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Вспомнили
                    пароль? <Link to="/login" className={styles.navLinks}>Войти</Link></p>
            </div>
        </div>
    );
}

export default ResetPassword;