import React from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";


function ResetPassword() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <form>
                    <div className={styles.inputContainer}>
                        <PasswordInput type="password" placeholder="Введите новый пароль" icon={'ShowIcon'}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <Input type="text" placeholder="Введите код из письма"/>
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