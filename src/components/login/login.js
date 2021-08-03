import React, {useState, useCallback} from 'react';
import styles from './login.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useAuth} from "../../services/auth";


function Login() {
    let history = useHistory();
    let auth = useAuth();

    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    let login = useCallback(
        e => {
            e.preventDefault();
            auth.signIn(form);
        },
        [auth, form]
    );

    if (auth.user) {
        return (<Redirect to={{pathname: '/'}} />);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
                <form>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="E-mail" name="email" onChange={onChange}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordInput type="password" placeholder="Пароль" name="password" icon={'ShowIcon'} onChange={onChange}/>
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20" onClick={login}>Войти</Button>
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