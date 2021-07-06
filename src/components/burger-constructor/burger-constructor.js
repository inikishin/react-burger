import React, {useContext, useState, useReducer, useEffect} from "react";
import PropTypes from 'prop-types';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {BurgerContext} from "../../contexts/burgerContext";

const url = "https://norma.nomoreparties.space/api/orders";

function BurgerConstructor(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    const ingredientsContext = useContext(BurgerContext);

    const bun = ingredientsContext.filter(x => (x.type === 'bun'))[0];
    const main = ingredientsContext.filter(x => (x.type !== 'bun')).slice(0, 4);

    const ingredientsIds = [bun._id];
    main.forEach((item) => {ingredientsIds.push(item._id)});

    useEffect(() => {
        const postOrder = async () => {
            fetch(url, {method: 'POST',
                            headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                      },
                            body: JSON.stringify({ingredients: ingredientsIds})
                            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            }).then((apiData) => {
                console.log(apiData);
                if (!apiData.order.number) {
                    throw new Error("No data");
                } else {
                    setOrderNumber(apiData.order.number);
                }
            }).catch(e => {
                console.log(e);
            }).finally(function () {
                setIsLoading(false);
            });
        }

        isLoading && postOrder();
        (!isLoading && orderNumber) && setModalVisible(true);
    }, [isLoading]);

    const initialConstructorState = {
        bun: bun,
        main: main,
        total: 0
    };
    function reducer(state, action) {
        switch (action.type) {
            case 'update': {
                let total = state.bun.price * 2;
                state.main.forEach((item) => {total += item.price});
                return {...state, total: total};
            }
            case 'reset':
                return initialConstructorState;
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }
    const [constructorState, dispatchConstructorState] = useReducer(reducer, initialConstructorState);

    useEffect(() => {
        dispatchConstructorState({ type: "update" });
    }, [ingredientsContext]);

    const openModal = (e) => {
        setIsLoading(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const modal = (
        <Modal onClose={closeModal} title="">
            <OrderDetails orderNumber={orderNumber} />
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
                {main.map((ingr) => (
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
                <p className="text text_type_digits-medium">{constructorState.total} <CurrencyIcon/></p>
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