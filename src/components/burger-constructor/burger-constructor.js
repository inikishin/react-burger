import React, {useState, useReducer, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop, useDrag} from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {getOrderNumber} from "../../services/actions/burger";

import {ADD_INGREDIENT_TO_BURGER, CHANGE_INGREDIENT_IN_BURGER, DELETE_INGREDIENT_FROM_BURGER} from "../../services/actions/burger";

function BurgerConstructor() {

    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState( -1); // стейт для определения текущего ингредиента, на который наведен курсор

    const { currentBurger, order } = useSelector(store => ({...store.burger}));
    const dispatch = useDispatch();

    const bun = currentBurger.bun;
    const main = currentBurger.main;

    const onDropHandler = (itemId) => {
        if (itemId.change) {
            dispatch({type: CHANGE_INGREDIENT_IN_BURGER, oldIndex: itemId.index, currentIndex: currentIndex});
        }
        else {
            dispatch({type: ADD_INGREDIENT_TO_BURGER, ingredientId: itemId, ingredientIndex: currentIndex});
        }
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
                    {main.map((ingr, index) => (
                        <ConstructorElementCusomized item={ingr} index={index} setCurrentIndex={setCurrentIndex} />
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


function ConstructorElementCusomized(props) {
    const dispatch = useDispatch();
    const u_key = uuidv4();

    const [{isOver}, dropRef ] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: {id: props.item._id, index: props.index, change: true},
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });

    useEffect(() => {
        if (isOver) {
            props.setCurrentIndex(props.index);
        }
    });

    const handleDeleteElement = () => {
        dispatch({
            type: DELETE_INGREDIENT_FROM_BURGER,
            ingredientIndex: props.index,
            ingredientId: props.item._id});
    };

    return (<div ref={dragRef}>
                {!isDrag && <li className={`${style.mainItem} p-2`} key={u_key} ref={dropRef}>
                                <DragIcon/>
                                <ConstructorElement
                                    isLocked={false} text={props.item.name} thumbnail={props.item.image}
                                    price={props.item.price} handleClose={handleDeleteElement} style={{display: "block"}}/>

                            </li>}
                {isOver && <li className={`${style.mainItem} m-5 p-2`}></li>}
            </div>
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