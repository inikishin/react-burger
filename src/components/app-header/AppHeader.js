import React from "react";

import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import style from "./AppHeader.module.css";

class AppHeader extends React.Component {
    render() {
        return (
            <header>
                <div className={style.logo}><Logo></Logo></div>
                <nav className={style.nav}>
                    <div>
                        <Button type="secondary"><BurgerIcon type="secondary"></BurgerIcon> Конструктор</Button>
                        <Button type="secondary"><ListIcon type="secondary"></ListIcon> Лента заказов</Button>
                    </div>
                    <div>
                        <Button type="secondary"><ProfileIcon type="secondary"></ProfileIcon> Личный
                        кабинет</Button>
                    </div>
                </nav>
            </header>
        );

    }
}

export default AppHeader;