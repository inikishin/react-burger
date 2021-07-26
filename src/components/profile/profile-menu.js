import React from "react";
import styles from './profile-menu.module.css';

import {Link, NavLink} from "react-router-dom";

function ProfileMenu() {
    return (
        <div className={styles.menuWrapper}>
            <ul className={styles.profileMenu}>
                <li className={styles.profileMenuItem}>
                    <NavLink to={{ pathname: `/profile` }} className={styles.link} activeClassName={styles.linkActive}>
                        <span className="text text_type_main-medium">Профиль</span>
                    </NavLink>
                </li>
                <li className={styles.profileMenuItem}>
                    <NavLink to={{ pathname: `/history` }} className={styles.link} activeClassName={styles.linkActive}>
                        <span className="text text_type_main-medium">История заказов</span>
                    </NavLink>
                </li>
                <li className={styles.profileMenuItem}>
                    <NavLink to={{ pathname: `/logout` }} className={styles.link} activeClassName={styles.linkActive}>
                        <span className="text text_type_main-medium" activeClassName={styles.linkActive}>Выход</span>
                    </NavLink>
                </li>
            </ul>
            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}

export default ProfileMenu;