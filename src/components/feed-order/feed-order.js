import {useSelector} from "react-redux";
import styles from "./feed-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import {convertOrderDate, getReadableStatus} from "../../services/handleData";

function FeedOrder(props) {
    const {ingredients} = useSelector(store => ({...store.ingredients}));
    const orderIngredients = ingredients.filter(item => props.ingredients.indexOf(item._id) !== -1);

    const orderTotal = orderIngredients.reduce((previousValue, currentItem) => (currentItem.price + previousValue), 0);

    return (
            <li className={styles.order}>
                <div className={`mb-5 ${styles.orderHeader}`}>
                    <div>
                        <span className="text text_type_digits-default">#{props.number}</span>
                    </div>
                    <div>
                        <span className="text text_type_main-default text_color_inactive">{convertOrderDate(props.createdAt)}</span>
                    </div>
                </div>
                <h2 className="text text_type_main-medium mb-5">{props.name}</h2>
                <p className={`text text_type_main-default mb-5`}>{getReadableStatus(props.status)}</p>
                <div className={`mb-5 ${styles.orderHeader}`}>
                    <div>
                        {orderIngredients.map((item) => (
                            <img src={item.image_mobile} key={item._id} alt={`ingredient-preview-${item._id}`} className={styles.ingredientPreview}/>
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
    number: PropTypes.number,
    status: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string)
}

export default FeedOrder;