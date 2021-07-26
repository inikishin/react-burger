import React from 'react';
import styles from './register.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import AppHeader from "../app-header/app-header";


function Register() {
    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                    <form>
                        <div className={styles.inputContainer}>
                            <Input type="text" placeholder="Имя"/>
                        </div>
                        <div className={styles.inputContainer}>
                            <Input type="text" placeholder="E-mail"/>
                        </div>
                        <div className={styles.inputContainer}>
                            <PasswordInput type="password" placeholder="Пароль" icon={'ShowIcon'} />
                        </div>
                        <div className="mb-20">
                            <Button size="medium" className="mb-20">Зарегистрироваться</Button>
                        </div>
                    </form>
                        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы?
                            <Link to="/login" className={styles.navLinks}>Войти</Link></p>
                </div>
            </div>

        </>);
}

export default Register;