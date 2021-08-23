import React from "react";

import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import style from './order-details.module.css';

interface IOrderDetailsProps {
    orderNumber: string
};

function OrderDetails(props: IOrderDetailsProps) {
    return (
        <div className={style.bodyContent}>
            <p className="text text_type_digits-large p-15">{props.orderNumber}</p>
            <p className="text text_type_main-medium p-5 mb-10">идентификатор заказа</p>
            <CheckMarkIcon type="primary"/>
            <p className="text text_type_main-default p-5 mt-10">Ваш заказ начали готовить</p>
            <p className={style.secondaryText}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;