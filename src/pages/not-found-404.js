import React from "react";
import styles from './not-found-404.module.css';

import {Link} from "react-router-dom";

function NotFound404() {
    return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <p className="text text_type_main-medium text_color_inactive mb-6">Ошибка 404 - Страница не найдена</p>
                    <p className="text text_type_main-default text_color_inactive mb-6">Вы можете вернуться
                        на <Link to='/' className={styles.link}>главную страницу</Link></p>
                </div>
            </div>
    )
}

export default NotFound404;