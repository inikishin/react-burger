import React from "react";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';
import PropTypes from "prop-types";


function Ingredient(props) {

    function callBack() {
        props.openModal(props);
    }

    return (
        <div className={style.container} onClick={callBack}>
            <img src={props.image} alt={props.name}/>
            <Counter count={props.count} size="small" />
            <p className="text text_type_digits-default">{props.price} <CurrencyIcon /></p>
            <p className="text text_type_main-default">{props.name}</p>
        </div>
    )
}

Ingredient.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
}

export default Ingredient;