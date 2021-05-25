import React from "react";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
    return (
        <div>
            <img src={props.image} alt={props.name}/>
            <Counter count={1} size="small" />
            <p className="text text_type_digits-default">{props.price} <CurrencyIcon /></p>
            <p className="text text_type_main-default">{props.name}</p>
        </div>
    )
}

export default Ingredient;