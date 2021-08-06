import React, {useCallback, useState} from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login as loginAuth, register as registerAuth} from "../../services/actions/auth";


function Register() {

    const auth = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [form, setValue] = useState({ name: '', email: '', password: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const register = useCallback(
        e => {
            e.preventDefault();
            dispatch(registerAuth(form));
        },
        [auth, form]
    );

    if (auth.isAuthenticated) {
        return (<Redirect to={{pathname: '/'}} />);
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <form onSubmit={register}>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="Имя" name="name" onChange={onChange}
                        value={form.name}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="E-mail" name="email" onChange={onChange} value={form.email}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <PasswordInput type="password" placeholder="Пароль" name="password" icon={'ShowIcon'}
                                       onChange={onChange} value={form.password}/>
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20">Зарегистрироваться</Button>
                    </div>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы?
                    <Link to="/login" className={styles.navLinks}>Войти</Link></p>
            </div>
        </div>
    );
}

export default Register;