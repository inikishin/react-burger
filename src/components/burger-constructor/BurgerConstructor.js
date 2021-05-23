import React from "react";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './BurgerConstructor.module.css';

function BurgerConstructor(props) {
    return (
        <section style={{width: "50%"}}>
            <ul className={style.ul}>
                {props.data.map((ingr, index) => (
                    <li className={style.li} key={index}>
                        <ConstructorElement type={(index===0) ? "top": (index===(props.data.length-1)) ? "bottom": undefined} isLocked={true} text={ingr.name} thumbnail={ingr.image}
                                            price={ingr.price} style={{display: "block"}}></ConstructorElement>
                    </li>
                ))}
            </ul>
            <div className={style.footer}>
                <p className="text text_type_digits-medium">1234 <CurrencyIcon/></p>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;