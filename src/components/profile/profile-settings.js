import React from 'react';
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-settings.module.css";

function ProfileSettings() {
    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.inputContainer}>
                <Input type="text" placeholder="Имя" value="Марк" icon={'EditIcon'}/>
            </div>
            <div className={styles.inputContainer}>
                <Input type="text" placeholder="Логин" value="mail@stellar.burgers" icon={'EditIcon'}/>
            </div>
            <div className={styles.inputContainer}>
                <PasswordInput type="password" placeholder="Пароль" icon={'EditIcon'} value="123456"/>
            </div>
        </div>
    )
}

export default ProfileSettings;