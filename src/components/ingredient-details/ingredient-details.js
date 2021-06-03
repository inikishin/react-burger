import React from "react";

import style from './ingredient-details.module.css';
import PropTypes from "prop-types";

function IngredientDetails(props) {
    return (
        <div className={style.bodyContent}>
            <img src={props.image_large} alt={props.name}/>
            <p className="text text_type_main-medium p-5">{props.name}</p>
            <p className="text text_type_main-default p-5">{props.name}</p>
            <div className={style.details}>
                <div className={style.secondaryText}><p>Калории, ккал</p>
                    <p className="text text_type_digits-default">{props.calories}</p></div>
                <div className={style.secondaryText}><p>Белки, г</p>
                    <p className="text text_type_digits-default">{props.proteins}</p></div>
                <div className={style.secondaryText}><p>Жиры, г</p>
                    <p className="text text_type_digits-default">{props.fat}</p></div>
                <div className={style.secondaryText}><p>Углеводы, г</p>
                    <p className="text text_type_digits-default">{props.carbohydrates}</p></div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    image_large: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}

export default IngredientDetails;