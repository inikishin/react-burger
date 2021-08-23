import React, {useEffect, useState, useRef} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-settings.module.css";
//import {useDispatch, useSelector} from "react-redux";
import { useSelector, useDispatch } from '../../types/hooks';
import {getUser, setUserAttributes} from "../../services/actions/auth";
import {TRootState} from "../../services/reducers";

function ProfileSettings() {

    const dispatch = useDispatch();
    const auth = useSelector((store: TRootState) => ({...store.auth}));


    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
            dispatch(getUser());
        },
        []);

    const [form, setValue] = useState({ name: auth.user.name, email: auth.user.email, password: '' });

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const saveUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(setUserAttributes(form));
    }

    const cancelUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (nameInput.current) {
            nameInput.current.value = auth.user.name
        };
        if (emailInput.current) {
            emailInput.current.value = auth.user.email
        };
    }

    return (
        <div className={styles.settingsWrapper}>
            <form onSubmit={saveUser}>
                <div className={styles.inputContainer}>
                    <Input ref={nameInput} type="text" placeholder="Имя" name="name" onChange={onChange} value={form.name}
                           icon={'EditIcon'}/>
                </div>
                <div className={styles.inputContainer}>
                    <Input ref={emailInput} type="text" placeholder="Логин" name="email" value={form.email}
                           onChange={onChange} icon={'EditIcon'}/>
                </div>
                <div className={styles.inputContainer}>
                    <PasswordInput name="password"
                                   onChange={onChange} value={form.password}/>
                </div>
                <div className={styles.buttonsBlock}>
                    <div className="mb-20">
                        <Button type="primary" size="medium">Сохранить</Button>
                    </div>
                    <div className="mb-20">
                        <Button type="secondary" size="medium" onClick={() => cancelUser}>Отмена</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileSettings;