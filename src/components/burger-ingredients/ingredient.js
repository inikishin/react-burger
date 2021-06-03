import React from "react";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';
import PropTypes from "prop-types";


function Ingredient(props) {

    function callBack() {
        props.openModal(props.ingredient);
    }

    return (
        <div className={style.container} onClick={callBack}>
            <img src={props.ingredient.image} alt={props.ingredient.name}/>
            <Counter count={props.count} size="small" />
            <p className="text text_type_digits-default">{props.ingredient.price} <CurrencyIcon /></p>
            <p className="text text_type_main-default">{props.ingredient.name}</p>
        </div>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number }),
    count: PropTypes.number,
    openModal: PropTypes.func
}

export default Ingredient;