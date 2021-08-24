import { useSelector } from '../../types/hooks';
import styles from "./feed-order.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {convertOrderDate, getReadableStatus} from "../../services/handleData";
import {TRootState} from "../../services/reducers";

interface IFeedOrderProps {
    name: string,
    createdAt: string,
    number: number,
    status: string,
    ingredients: Array<string>
};

function FeedOrder(props: IFeedOrderProps) {
    const {ingredients} = useSelector((store:TRootState) => ({...store.ingredients}));
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
                        <span className="text text_type_digits-default">{orderTotal} <CurrencyIcon type="primary"/></span>
                    </div>
                </div>
            </li>
    )
}

export default FeedOrder;