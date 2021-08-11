import React, {useEffect} from "react";
import styles from './feed.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {getIngredients} from "../../services/actions/ingredients";


function Feed(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <ul className={styles.ordersList}>
            {props.orders.map((item) => (
                <FeedOrder {...item} key={item._id}/>
            ))}
        </ul>
    );
}

function FeedOrder(props) {
    const location = useLocation();

    const {ingredients} = useSelector(store => ({...store.ingredients}));
    const orderIngredients = ingredients.filter(item => props.ingredients.indexOf(item._id) != -1);

    const orderTotal = orderIngredients.reduce((previousValue, currentItem) => (currentItem.price + previousValue), 0);
    console.log(orderIngredients);
    const orderIngredientsPreview = orderIngredients.slice(0, 5);
    console.log(orderIngredientsPreview);

    return (
        <Link to={{pathname: `/feed/${props._id}`, state: {background: location}}} className={styles.orderLink}>
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
        </Link>
    )
}

export default Feed;