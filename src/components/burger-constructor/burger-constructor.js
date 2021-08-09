import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop, useDrag} from 'react-dnd';

import { CurrencyIcon, DragIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import {getOrderNumber, ADD_INGREDIENT_TO_BURGER, CHANGE_INGREDIENT_IN_BURGER, DELETE_INGREDIENT_FROM_BURGER} from "../../services/actions/order";
import { INCREASE_INGREDIENT_COUNTER, DECSEASE_INGREDIENT_COUNTER } from "../../services/actions/ingredients";
import PropTypes from "prop-types";
import Ingredient from "../burger-ingredients/ingredient";

function BurgerConstructor() {

    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState( -1); // стейт для определения текущего ингредиента, на который наведен курсор

    const { currentBurger, order } = useSelector(store => ({...store.order}));
    const auth = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const bun = currentBurger.bun;
    const main = currentBurger.main;

    const onDropHandler = (item) => {
        if (item.change) {
            dispatch({type: CHANGE_INGREDIENT_IN_BURGER, oldIndex: item.index, currentIndex: currentIndex});
        }
        else {
            dispatch({type: ADD_INGREDIENT_TO_BURGER, ingredient: item, ingredientIndex: currentIndex});
            dispatch({type: INCREASE_INGREDIENT_COUNTER, ingredient: item});
        }
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            onDropHandler(item);
        }
    });

    const [{isOver}, dropRef ] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });

    useEffect(() => {
        if (isOver) {
            setCurrentIndex(0);
        }
    }, [isOver]);

    const createOrder = (e) => {
        const ingredientsIds = [];
        bun && ingredientsIds.push(bun._id);
        main.forEach((item) => {ingredientsIds.push(item._id)});
        dispatch(getOrderNumber(ingredientsIds));
    }

    useEffect(() => {
        (!order.isLoadingOrderNumber && order.number) && setModalVisible(true);
    }, [order.number]);

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
            <div ref={dropRef}>
                {bun._id ?
                    <div className={`${style.bunItem} p-2 mr-5`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true} text={`${bun.name} (верх)`} thumbnail={bun.image}
                            price={bun.price}/>
                    </div>
                    :
                    <div className={`${style.emptyItems} m-2 p-2`}>
                        <p className="text text_type_main-default">Выберите булку для космического бургера</p>
                    </div>}
                {isOver && <div className={`${style.mainItem} m-5 p-2`}></div>}
            </div>

            {main.length > 0 ? <ul className={style.itemList}>
                    {main.map((ingr, index) => (
                        <ConstructorElementCusomized item={ingr} key={ingr.key} index={index} setCurrentIndex={setCurrentIndex} />
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
                    isLocked={true} text={`${bun.name} (низ)`} thumbnail={bun.image}
                    price={bun.price} style={{display: "block"}}/>}
            </div>

            <div className={`${style.orderFooter} p-5`}>
                <p className="text text_type_digits-medium">{currentBurger.total} <CurrencyIcon/></p>
                {auth.isAuthenticated ?
                    <Button type="primary" size="large" onClick={createOrder} active={false}>
                        {!order.isLoadingOrderNumber ? `Оформить заказ` : `Получаем номер...`}
                    </Button>
                    :
                    <span className="text text_type_main-default text_color_inactive">Пожалуйста авторизуйтесь, чтобы сделать заказ</span>
                }
                {modalVisible && modal}
            </div>
        </section>
    )
}

function ConstructorElementCusomized(props) {
    const dispatch = useDispatch();

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
            props.setCurrentIndex(props.index + 1);
        }
    });

    const handleDeleteElement = () => {
        dispatch({
            type: DELETE_INGREDIENT_FROM_BURGER,
            ingredientIndex: props.index,
            ingredientId: props.item._id});

        dispatch({
                type: DECSEASE_INGREDIENT_COUNTER,
                ingredient: props.item
            }
        );
    };

    return (<div ref={dragRef}>
                {!isDrag && <li className={`${style.mainItem} p-2`} ref={dropRef}>
                                <DragIcon/>
                                <ConstructorElement
                                    isLocked={false} text={props.item.name} thumbnail={props.item.image}
                                    price={props.item.price} handleClose={handleDeleteElement} style={{display: "block"}}/>

                            </li>}
                {isOver && <li className={`${style.mainItem} m-5 p-2`}></li>}
            </div>
            )
}

ConstructorElementCusomized.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        _id: PropTypes.string}),
    index: PropTypes.number,
    setCurrentIndex: PropTypes.func
}

export default BurgerConstructor;