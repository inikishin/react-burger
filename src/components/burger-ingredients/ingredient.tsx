import React, {ReactNode} from "react";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";

interface IIngredientProps {
    ingredient: {
        image: string,
        name: string,
        price: number
    },
    count: number | undefined
};

function Ingredient(props: IIngredientProps): JSX.Element {
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: {...props.ingredient},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    if (!isDrag) {
        return (<div className={style.container} ref={dragRef}>
            <img src={props.ingredient.image} alt={props.ingredient.name}/>
            { props.count ? (props.count > 0 && <Counter count={props.count} size="small" />) : <></> }
            <p className="text text_type_digits-default">{props.ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className="text text_type_main-default">{props.ingredient.name}</p>
        </div>);
    } else {
        return (<div></div>);
    }
}

Ingredient.propTypes = {
    ingredient: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number }),
    count: PropTypes.number
}

export default Ingredient;