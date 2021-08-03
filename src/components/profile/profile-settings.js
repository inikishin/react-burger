import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-settings.module.css";
import {useAuth} from "../../services/auth";

function ProfileSettings() {
    const auth = useAuth();

    const nameInput = useRef(null);
    const emailInput = useRef(null);

    useEffect(() => {
            auth.getUser();
        },
        []);

    const [form, setValue] = useState({ name: auth.user.name, email: auth.user.email, password: '' });

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const saveUser = useCallback(
        e => {
            e.preventDefault();
            auth.setUserAttributes(form);
        },
        [auth, form]
    );

    const cancelUser = (e) => {
        e.preventDefault()
        nameInput.current.value = auth.user.name;
        emailInput.current.value = auth.user.email;
    }

    return (
        <div className={styles.settingsWrapper}>
            <form>
                <div className={styles.inputContainer}>
                    <Input ref={nameInput} type="text" placeholder="Имя" name="name" onChange={onChange} value={form.name}
                           icon={'EditIcon'}/>
                </div>
                <div className={styles.inputContainer}>
                    <Input ref={emailInput} type="text" placeholder="Логин" name="email" value={form.email}
                           onChange={onChange} icon={'EditIcon'}/>
                </div>
                <div className={styles.inputContainer}>
                    <PasswordInput type="password" name="password" placeholder="Пароль" icon={'EditIcon'} defaultValue=""
                                   onChange={onChange} />
                </div>
                <div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20" onClick={saveUser}>Сохранить</Button>
                    </div>
                    <div className="mb-20">
                        <Button size="medium" className="mb-20" onClick={cancelUser}>Отмена</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileSettings;