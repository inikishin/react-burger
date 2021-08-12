import React, {useEffect} from "react";
import styles from './order-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {useParams} from "react-router-dom";

function OrderInfo() {

    const {id} = useParams();
    const {orders} = useSelector(store => ({...store.feed}));
    const order = orders.find(item => item._id === id);

    const dispatch = useDispatch();
    const {ingredients} = useSelector(store => ({...store.ingredients}));
    const orderIngredients = ingredients.filter(item => order.ingredients.indexOf(item._id) != -1);
    const orderTotal = orderIngredients.reduce((previousValue, currentItem) => (currentItem.price + previousValue), 0);

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <div className="mb-15">
                <p className="text text_type_digits-default">#{order.number}</p>
            </div>
            <div className="mb-15">
                <h2 className="text text_type_main-medium mb-5">{order.name}</h2>
                <p className={`text text_type_main-default mb-5 ${styles.ordersDone}`}>{order.status}</p>
            </div>
            <h2 className="text text_type_main-medium mb-5">Состав:</h2>
            <ul className={styles.ingredientsWrapper}>
                {orderIngredients.map(item => (
                    <li className={styles.ingredientWrapper} key={item._id}>
                        <div className={styles.ingredient}>
                            <img src={item.image_mobile} className={styles.ingredientPreview}/>
                            <span className="text text_type_main-default ml-4">{item.name}</span>
                        </div>
                        <span className="text text_type_digits-default">1 x {item.price} <CurrencyIcon /></span>
                    </li>
                ))}
            </ul>
            <div className={styles.ingredientWrapper}>
                <span className="text text_type_main-default text_color_inactive">{order.createdAt}</span>
                <span className="text text_type_digits-default">{orderTotal} <CurrencyIcon/></span>
            </div>
        </div>
    );
}

export default OrderInfo;