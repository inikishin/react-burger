import React, {useEffect} from "react";
import styles from './order-info.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/ingredients";
import {useLocation, useParams} from "react-router-dom";
import {WS_CONNECTION_START} from "../../services/actions/feed";
import {getCookie} from "../../utils/cookies";
import {convertOrderDate, getReadableStatus} from "../../services/handleData";

function OrderInfo() {

    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        if (location.state.background.pathname.indexOf('/profile/orders') > -1 ) {
            dispatch({type: WS_CONNECTION_START, payload: getCookie('token')})
        }
        else {
            dispatch({type: WS_CONNECTION_START});
        }
    }, []);

    const {orders} = useSelector(store => ({...store.feed}));
    const {ingredients} = useSelector(store => ({...store.ingredients}));

    if (orders.length > 0 && ingredients.length > 0) {
        const order = orders.find(item => item._id === id);
        const orderIngredients = ingredients.filter(item => order.ingredients.indexOf(item._id) !== -1);
        const orderTotal = orderIngredients.reduce((previousValue, currentItem) => (currentItem.price + previousValue), 0);

        return (
            <div className={styles.wrapper}>
                <div className="mb-15">
                    <p className="text text_type_digits-default">#{order.number}</p>
                </div>
                <div className="mb-15">
                    <h2 className="text text_type_main-medium mb-5">{order.name}</h2>
                    <p className={`text text_type_main-default mb-5 ${styles.ordersDone}`}>{getReadableStatus(order.status)}</p>
                </div>
                <h2 className="text text_type_main-medium mb-5">Состав:</h2>
                <ul className={styles.ingredientsWrapper}>
                    {orderIngredients.map(item => (
                        <li className={styles.ingredientWrapper} key={item._id}>
                            <div className={styles.ingredient}>
                                <img src={item.image_mobile} alt={`ingredient-preview-${item._id}`} className={styles.ingredientPreview}/>
                                <span className="text text_type_main-default ml-4">{item.name}</span>
                            </div>
                            <span className="text text_type_digits-default">1 x {item.price} <CurrencyIcon/></span>
                        </li>
                    ))}
                </ul>
                <div className={styles.ingredientWrapper}>
                    <span className="text text_type_main-default text_color_inactive">{convertOrderDate(order.createdAt)}</span>
                    <span className="text text_type_digits-default">{orderTotal} <CurrencyIcon/></span>
                </div>
            </div>
        );
    }
    else {
        return (<></>);
    }
}

export default OrderInfo;