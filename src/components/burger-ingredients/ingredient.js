import React, {useState} from "react";

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './ingredient.module.css';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";


function Ingredient(props) {

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (e) => {
        console.log(e);
        setModalVisible(true);
    }

    const closeModal = (e) => {
        setModalVisible(false);
        e.stopPropagation();
    }

    const modal = (
        <ModalOverlay onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails {...props} />
        </ModalOverlay>
    );

    return (
        <div className={style.container} onClick={openModal}>
            <img src={props.image} alt={props.name}/>
            <Counter count={props.count} size="small" />
            <p className="text text_type_digits-default">{props.price} <CurrencyIcon /></p>
            <p className="text text_type_main-default">{props.name}</p>
            {modalVisible && modal}
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