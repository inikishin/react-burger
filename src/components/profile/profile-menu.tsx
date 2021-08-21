import React, {useCallback, useEffect} from "react";
import styles from './profile-menu.module.css';

import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout as logoutRequest} from "../../services/actions/auth";
import {TRootState} from "../../services/reducers";


function ProfileMenu() {
    const history = useHistory();
    const auth = useSelector((store:TRootState) => store.auth);
    const dispatch = useDispatch();

    const logout = useCallback(
        () => {
            dispatch(logoutRequest());
        },
        [auth, history]
    );

    useEffect(() => {
        if (!auth.isAuthenticated) {
            // После выхода переадресуем пользователя на маршрут /login
            console.log('history.replace({pathname: \'/login\'});');
            history.replace({pathname: '/login'});
        }
    }, [auth.isAuthenticated])

    return (
        <div className={styles.menuWrapper}>
            <ul className={styles.profileMenu}>
                <li className={styles.profileMenuItem}>
                    <NavLink to={{ pathname: `/profile` }} className={styles.link}>
                        <span className="text text_type_main-medium">Профиль</span>
                    </NavLink>
                </li>
                <li className={styles.profileMenuItem}>
                    <NavLink to={{ pathname: `/profile/orders` }} className={styles.link}>
                        <span className="text text_type_main-medium">История заказов</span>
                    </NavLink>
                </li>
                <li className={styles.profileMenuItem}>
                    <NavLink to={{ pathname: `/login` }} className={styles.link} activeClassName={styles.linkActive}>
                        <span className="text text_type_main-medium" onClick={logout}>Выход</span>
                    </NavLink>
                </li>
            </ul>
            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}

export default ProfileMenu;