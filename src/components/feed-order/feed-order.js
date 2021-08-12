import {useSelector} from "react-redux";
import styles from "./feed-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

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
                        <span className="text text_type_main-default text_color_inactive">{props.createdAt}</span>
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