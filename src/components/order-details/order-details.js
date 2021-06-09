import React, {useContext, useEffect, useState} from "react";

import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import style from './order-details.module.css';
import {BurgerContext} from "../../utils/burgerContext";

const url = "https://norma.nomoreparties.space/api/orders";

function OrderDetails(props) {
    const [orderNumber, setOrderNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = React.useState(false);

    const ingredientsContext = useContext(BurgerContext);
    const ingredientsIds = [ingredientsContext.filter(x => (x.type === 'bun'))[0]._id];
    const main = ingredientsContext.filter(x => (x.type !== 'bun')).slice(0, 4);
    main.forEach((item) => {ingredientsIds.push(item._id)});

    useEffect(() => {
        const getData = async () => {
            fetch(url, {method: 'POST',
                            headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                      },
                            body: JSON.stringify({ingredients: ingredientsIds})
                            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            }).then((apiData) => {
                console.log(apiData);
                if (!apiData.order.number) {
                    throw new Error("No data");
                } else {
                    setOrderNumber(apiData.order.number);
                }
            }).catch(e => {
                setHasError(true);
            }).finally(function () {
                setIsLoading(false);
            });
        }

        getData();
    }, []);

    return (
        <div className={style.bodyContent}>
            {isLoading ?
                <h2 className="text text_type_main-medium p-5 mb-10">Pending order...</h2>
                :
                <>
                    <p className="text text_type_digits-large p-15">{orderNumber}</p>
                    <p className="text text_type_main-medium p-5 mb-10">идентификатор заказа</p>
                    <CheckMarkIcon type="primary"/>
                    <p className="text text_type_main-default p-5 mt-10">Ваш заказ начали готовить</p>
                    <p className={style.secondaryText}>Дождитесь готовности на орбитальной станции</p>
                </>}
        </div>
    )
}

export default OrderDetails;