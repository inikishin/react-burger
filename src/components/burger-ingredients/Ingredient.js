import React from "react";

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
    return (
        <div>
            <img src={props.image} alt={props.name}/>
            <Counter count={1} size="small"></Counter>
            <p className="text text_type_digits-default">{props.price} <CurrencyIcon></CurrencyIcon></p>
            <p>{props.name}</p>
        </div>
    )
}

export default Ingredient;