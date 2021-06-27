import React from "react";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";


function Ingredient(props) {
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: {id: props.ingredient._id},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    function callBack() {
        props.openModal(props.ingredient);
    }

    return (
        !isDrag &&
        <div className={style.container} onClick={callBack} ref={dragRef}>
            <img src={props.ingredient.image} alt={props.ingredient.name}/>
            { props.count && <Counter count={props.count} size="small" /> }
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