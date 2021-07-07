import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "./ingredient";
import style from "./burger-ingredients.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {getIngredients, ADD_INGREDIENT_DATA, DELETE_INGREDIENT_DATA} from "../../services/actions/burger";


function BurgerIngredients() {

    const [currentTab, setCurrentTab] = React.useState("bun");
    const [modalVisible, setModalVisible] = useState(false);

    const { ingredients, currentIngredient } = useSelector(store => ({...store.burger}));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const openModal = (item) => {
        dispatch({type: ADD_INGREDIENT_DATA, currentIngredient: item})
        setModalVisible(true);
    }

    const closeModal = () => {
        dispatch({type: DELETE_INGREDIENT_DATA});
        setModalVisible(false);
    }

    const modal = (
        <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails {...currentIngredient} />
        </Modal>
    );

    function setCurrent(currentValue) {
        setCurrentTab(currentValue);
        window.location.href = '/#' + currentValue;
    }

    return (
        <section style={{flexBasis: "content", width: "50%"}}>
            <div style={{display: 'flex'}}>
                <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div>
                <ul className={style.ingredients}>
                    <h2 className="text text_type_main-medium mt-15 mb-15">Булки</h2><a name="bun" />
                    {ingredients.filter(x => x.type === "bun").map((item, index) => (
                        <li key={index}>
                            <Ingredient ingredient={item} count={item.counter} openModal={openModal} />
                        </li>
                    ))}
                    <h2 className="text text_type_main-medium mt-15 mb-15">Соусы</h2><a name="sauce" />
                    {ingredients.filter(x => x.type === "sauce").map((item, index) => (
                        <li key={index}>
                            <Ingredient ingredient={item} count={item.counter} openModal={openModal} />
                        </li>
                    ))}
                    <h2 className="text text_type_main-medium mt-15 mb-15">Начинка</h2><a name="main" />
                    {ingredients.filter(x => x.type === "main").map((item, index) => (
                        <li key={index}>
                            <Ingredient ingredient={item} count={item.counter} openModal={openModal} />
                        </li>
                    ))}
                </ul>
            </div>
            {modalVisible && modal}
        </section>
    )
}

export default BurgerIngredients