import React, {useContext, useState, useReducer, useEffect} from "react";
import PropTypes from 'prop-types';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../utils/burgerContext";

function BurgerConstructor(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const ingredientsContext = useContext(BurgerContext);

    const bun = ingredientsContext.filter(x => (x.type === 'bun'))[0];
    const main = ingredientsContext.filter(x => (x.type !== 'bun')).slice(0, 4);

    const initialCost = 0;
    function reducer(state, action) {
        switch (action.type) {
            case 'update': {
                let total = bun.price * 2;
                main.forEach((item) => {total += item.price});
                return total;
            }
            case 'reset':
                return initialCost;
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }
    const [totalCost, dispatchTotalCost] = useReducer(reducer, initialCost);

    useEffect(() => {
        dispatchTotalCost({ type: "update" });
    }, [ingredientsContext]);

    const openModal = (e) => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const modal = (
        <Modal onClose={closeModal} title="">
            <OrderDetails />
        </Modal>
    );

    return (
        <section style={{width: "50%"}}>
            <div className={`${style.bunItem} p-2 mr-5`}>
                {bun && <ConstructorElement
                    type="top"
                    isLocked={true} text={bun.name} thumbnail={bun.image}
                    price={bun.price}/>}
            </div>
            <ul className={style.itemList}>
                {main.map((ingr, index) => (
                    <li className={`${style.mainItem} p-2`} key={ingr._id}>
                        <DragIcon/>
                        <ConstructorElement
                            text={ingr.name} thumbnail={ingr.image}
                            price={ingr.price} style={{display: "block"}}/>
                    </li>
                ))}
            </ul>
            <div className={`${style.bunItem} p-2`}>
                {bun && <ConstructorElement
                    type="bottom"
                    isLocked={true} text={bun.name} thumbnail={bun.image}
                    price={bun.price} style={{display: "block"}}/>}
            </div>

            <div className={`${style.orderFooter} p-5`}>
                <p className="text text_type_digits-medium">{totalCost} <CurrencyIcon/></p>
                <Button type="primary" size="large" onClick={openModal}>
                    Оформить заказ
                </Button>
                {modalVisible && modal}
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number
        }))
}

export default BurgerConstructor;