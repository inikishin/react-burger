import React from "react";

import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import style from "./app-header.module.css";


function AppHeader() {
    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <div className="pl-30">
                    <a className={style.navItem} href="#"><BurgerIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2"> Конструктор</span></a>
                    <a className={style.navItem} href="#"><ListIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2"> Лента заказов</span></a>
                </div>
                <Logo/>
                <div className="pr-30">
                    <a className={style.navItem} href="#"><ProfileIcon type="secondary"/> <span
                        className="text text_type_main-default pl-2">Личный
                        кабинет</span></a>
                </div>
            </nav>
        </header>
    )

}

export default AppHeader;