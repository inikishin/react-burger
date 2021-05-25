import React from "react";

import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import style from "./app-header.module.css";

class AppHeader extends React.Component {
    render() {
        return (
            <header className="mb-10">
                <nav className={style.nav}>
                    <div>
                        <a className={style.navItem} href="#"><BurgerIcon type="secondary"></BurgerIcon> <span
                            className="text text_type_main-default">Конструктор</span></a>
                        <a className={style.navItem} href="#"><ListIcon type="secondary"></ListIcon> <span
                            className="text text_type_main-default">Лента заказов</span></a>
                    </div>
                    <Logo/>
                    <div>
                        <a className={style.navItem} href="#"><ProfileIcon type="secondary"></ProfileIcon> <span
                            className="text text_type_main-default">Личный
                        кабинет</span></a>
                    </div>
                </nav>
            </header>
        );

    }
}

export default AppHeader;