
import {useSelector} from "react-redux";
import styles from "./feed-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

function converOrderDate(date){
    const newDate = new Date(date);
    const currentDate = new Date();
    const delta = currentDate.getDate() - newDate.getDate();
    console.log(typeof delta);
    let deltaString = '';
    if (delta === 0) {
        deltaString = 'Сегодня';
    }
    else if (delta === 1) {
        deltaString = 'Вчера';
    }
    else if (delta < 4){
        deltaString = delta + ' дня назад';
    }
    else {
        deltaString = delta + ' дней назад';
    }

    const options = {timeZoneName: 'short', hour: 'numeric', minute: 'numeric'}
    return deltaString + ", " + newDate.toLocaleTimeString("ru-RU", options);
}

function FeedOrder(props) {

    const {ingredients} = useSelector(store => ({...store.ingredients}));
    const orderIngredients = ingredients.filter(item => props.ingredients.indexOf(item._id) != -1);

    const orderTotal = orderIngredients.reduce((previousValue, currentItem) => (currentItem.price + previousValue), 0);

    return (
            <li className={styles.order}>
                <div className={`mb-5 ${styles.orderHeader}`}>
                    <div>
                        <span className="text text_type_digits-default">#{props.number}</span>
                    </div>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">{converOrderDate(props.createdAt)}</span>
                    </div>
                </div>
                <h2 className="text text_type_main-medium mb-5">{props.name}</h2>
                <div className={`mb-5 ${styles.orderHeader}`}>
                    <div>
                        {orderIngredients.map((item) => (
                            <img src={item.image_mobile} key={item._id} className={styles.ingredientPreview}/>
                        ))
                        }
                    </div>
                    <div>
                        <span className="text text_type_digits-default">{orderTotal} <CurrencyIcon/></span>
                    </div>
                </div>
            </li>
    )
}

FeedOrder.propTypes = {
    name: PropTypes.string,
    createdAt: PropTypes.string,
    number: PropTypes.string,
    ingredients: PropTypes.shape({
        image_mobile: PropTypes.string,
        _id: PropTypes.string
    })
}

export default FeedOrder;