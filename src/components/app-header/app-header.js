import React from "react";

import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import style from "./app-header.module.css";
import {Link} from "react-router-dom";
import {useAuth} from "../../services/auth";

function AppHeader() {
    let auth = useAuth();

    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <div className="pl-30">
                    <Link className={style.navItem} to="/"><BurgerIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2"> Конструктор</span></Link>
                    <a className={style.navItem} href="#"><ListIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2"> Лента заказов</span></a>
                </div>
                <Link to="/">
                    <Logo/>
                </Link>
                <div className="pr-30">
                    {auth.user ?
                        <Link to="/profile" className={style.navItem}><ProfileIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2">Личный
                        кабинет</span></Link>
                        :
                        <Link to="/login" className={style.navItem}><ProfileIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2">Войти</span></Link>}

                </div>
            </nav>
        </header>
    )

}

export default AppHeader;