import React from "react";

import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import style from "./app-header.module.css";
import {Link} from "react-router-dom";


function AppHeader() {
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
                    <Link to="/login" className={style.navItem}><ProfileIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2">Личный
                        кабинет</span></Link>
                </div>
            </nav>
        </header>
    )

}

export default AppHeader;