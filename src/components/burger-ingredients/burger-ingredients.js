import React, {useState} from "react";
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from "./ingredient";

import style from "./burger-ingredients.module.css";

function BurgerIngredients(props) {

    const [state, setState] = React.useState({currentTab: "bun"});

    function setCurrent(currentValue) {
        setState({currentTab: currentValue});
        window.location.href = '/#' + currentValue;
    }

        return (
            <section style={{flexBasis: "content", width: "50%"}}>
                <div style={{display: 'flex'}}>
                    <Tab value="bun" active={state.currentTab === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={state.currentTab === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={state.currentTab === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div>
                    <ul className={style.ul}>
                        <h2 className="text text_type_main-medium mt-15 mb-15">Булки</h2><a name="bun"></a>
                        {props.data.filter(x => x.type === "bun").map((item, index) => (
                            <li key={index}>
                                <Ingredient {...item} count={3}></Ingredient>
                            </li>
                        ))}
                        <h2 className="text text_type_main-medium mt-15 mb-15">Соусы</h2><a name="sauce"></a>
                        {props.data.filter(x => x.type === "sauce").map((item, index) => (
                            <li key={index}>
                                <Ingredient {...item} count={2}></Ingredient>
                            </li>
                        ))}
                        <h2 className="text text_type_main-medium mt-15 mb-15">Начинка</h2><a name="main"></a>
                        {props.data.filter(x => x.type === "main").map((item, index) => (
                            <li key={index}>
                                <Ingredient {...item} count={1}></Ingredient>
                            </li>
                        ))}
                    </ul>
                </div>
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