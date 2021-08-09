import React from "react";

import style from './ingredient-details.module.css';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function IngredientDetails() {
    const {id} = useParams();

    const ingredients_array = useSelector(store => store.ingredients.ingredients);
    const item = ingredients_array.filter(item => item._id === id)[0];

    if (item) {
        return (
            <div className={style.bodyContent}>
                <img src={item.image_large} alt={item.name}/>
                <p className="text text_type_main-medium p-5">{item.name}</p>
                <p className="text text_type_main-default p-5">{item.name}</p>
                <div className={style.details}>
                    <div className={style.secondaryText}><p>Калории, ккал</p>
                        <p className="text text_type_digits-default">{item.calories}</p></div>
                    <div className={style.secondaryText}><p>Белки, г</p>
                        <p className="text text_type_digits-default">{item.proteins}</p></div>
                    <div className={style.secondaryText}><p>Жиры, г</p>
                        <p className="text text_type_digits-default">{item.fat}</p></div>
                    <div className={style.secondaryText}><p>Углеводы, г</p>
                        <p className="text text_type_digits-default">{item.carbohydrates}</p></div>
                </div>
            </div>
        )
    } else {
        return (<div className={style.bodyContent}><span>NO</span></div>)
    }
}

export default IngredientDetails;