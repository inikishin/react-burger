import React from "react";
import PropTypes from 'prop-types';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';

function BurgerConstructor(props) {

    const topBun = props.data.filter(x => (x.type === 'bun'))[0];
    const main = props.data.filter(x => (x.type !== 'bun'));
    const bottomBum = props.data.filter(x => (x.type === 'bun'))[1];

    return (
        <section style={{width: "50%"}}>
            <ul className={style.ul}>
                <li className={style.li} key={topBun._id}>
                    <DragIcon />
                    <ConstructorElement
                        type="top"
                        isLocked={true} text={topBun.name} thumbnail={topBun.image}
                        price={topBun.price} style={{display: "block"}}/>
                </li>
                {main.map((ingr, index) => (
                    <li className={style.li} key={ingr._id}>
                        <DragIcon />
                        <ConstructorElement

                            isLocked={true} text={ingr.name} thumbnail={ingr.image}
                            price={ingr.price} style={{display: "block"}}/>
                    </li>
                ))}
                <li className={style.li} key={bottomBum._id}>
                    <DragIcon />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true} text={bottomBum.name} thumbnail={bottomBum.image}
                        price={bottomBum.price} style={{display: "block"}}/>
                </li>
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

BurgerConstructor.propTypes = {
    data: PropTypes.array
}

export default BurgerConstructor;