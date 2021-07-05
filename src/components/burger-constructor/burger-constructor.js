import React, {useState, useReducer, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {getOrderNumber} from "../../services/actions/burger";

import {ADD_INGREDIENT_TO_BURGER} from "../../services/actions/burger";

function BurgerConstructor() {

    const [modalVisible, setModalVisible] = useState(false);

    const { currentBurger, order } = useSelector(store => ({...store.burger}));
    const dispatch = useDispatch();

    const bun = currentBurger.bun;
    const main = currentBurger.main;

    const onDropHandler = (itemId) => {
        dispatch({type: ADD_INGREDIENT_TO_BURGER, ingredientId: itemId});
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(itemId) {
            onDropHandler(itemId);
        }
    });

    useEffect(() => {
        (!order.isLoadingOrderNumber && order.number) && setModalVisible(true);
    }, [order.number]);

    const createOrder = (e) => {
        const ingredientsIds = [];
        bun && ingredientsIds.push(bun._id);
        main.forEach((item) => {ingredientsIds.push(item._id)});
        dispatch(getOrderNumber(ingredientsIds));
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const modal = (
        <Modal onClose={closeModal} title="">
            <OrderDetails orderNumber={order.number} />
        </Modal>
    );

    const handleDeleteElement = (e) => {
        console.log(e);
    }

    return (
        <section style={{width: "50%"}} ref={dropTarget}>
            {bun._id ? <div className={`${style.bunItem} p-2 mr-5`}>
                            <ConstructorElement
                            type="top"
                            isLocked={true} text={bun.name} thumbnail={bun.image}
                            price={bun.price}/>
                        </div> :
                        <div className={`${style.emptyItems} m-2 p-2`}>
                            <p className="text text_type_main-default">Выберите булку для космического бургера</p>
                        </div>}

            {main.length > 0 ? <ul className={style.itemList}>
                    {main.map((ingr) => (
                        <li className={`${style.mainItem} p-2`} key={uuidv4()}>
                            <DragIcon/>
                            <ConstructorElement
                                text={ingr.name}
                                thumbnail={ingr.image}
                                price={ingr.price}
                                style={{display: "block"}}
                                handleClose={handleDeleteElement}/>
                        </li>
                    ))}
                </ul>
                :
                <div className={`${style.emptyItems} m-2 p-2`}>
                    <p className="text text_type_main-default">Добавьте ингридиенты</p>
                </div>
            }

            <div className={`${style.bunItem} p-2`}>
                {bun._id && <ConstructorElement
                    type="bottom"
                    isLocked={true} text={bun.name} thumbnail={bun.image}
                    price={bun.price} style={{display: "block"}}/>}
            </div>

            <div className={`${style.orderFooter} p-5`}>
                <p className="text text_type_digits-medium">{currentBurger.total} <CurrencyIcon/></p>
                <Button type="primary" size="large" onClick={createOrder}>
                    { !order.isLoadingOrderNumber ? `Оформить заказ` : `Получаем номер...`}
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