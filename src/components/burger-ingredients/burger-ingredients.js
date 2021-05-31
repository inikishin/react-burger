import React, {useState} from "react";
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from "./ingredient";

import style from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

function BurgerIngredients(props) {

    const [state, setState] = React.useState("bun");
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIngedient, setCurrentIngedient] = useState({});


    const openModal = (e) => {
        setCurrentIngedient(e);
        setModalVisible(true);
    }

    const closeModal = (e) => {
        if ((e.target.id === 'my-modal') || (e.currentTarget.id === "close-modal") || (e.key === 'Escape')) {
            setModalVisible(false);
            e.stopPropagation();
        }
    }

    const modal = (
        <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails {...currentIngedient} />
        </Modal>
    );

    function setCurrent(currentValue) {
        setState(currentValue);
        window.location.href = '/#' + currentValue;
    }

        return (
            <section style={{flexBasis: "content", width: "50%"}}>
                <div style={{display: 'flex'}}>
                    <Tab value="bun" active={state === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={state === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={state === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div>
                    <ul className={style.ul}>
                        <h2 className="text text_type_main-medium mt-15 mb-15">Булки</h2><a name="bun" />
                        {props.data.filter(x => x.type === "bun").map((item, index) => (
                            <li key={index}>
                                <Ingredient {...item} count={3} openModal={openModal} />
                            </li>
                        ))}
                        <h2 className="text text_type_main-medium mt-15 mb-15">Соусы</h2><a name="sauce" />
                        {props.data.filter(x => x.type === "sauce").map((item, index) => (
                            <li key={index}>
                                <Ingredient {...item} count={2} openModal={openModal} />
                            </li>
                        ))}
                        <h2 className="text text_type_main-medium mt-15 mb-15">Начинка</h2><a name="main" />
                        {props.data.filter(x => x.type === "main").map((item, index) => (
                            <li key={index}>
                                <Ingredient {...item} count={1} openModal={openModal} />
                            </li>
                        ))}
                    </ul>
                </div>
                {modalVisible && modal}
            </section>
        )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number
        }))
}

export default BurgerIngredients