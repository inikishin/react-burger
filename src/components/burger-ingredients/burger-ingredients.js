import React from "react";
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from "./ingredient";

import style from "./burger-ingredients.module.css";

class BurgerIngredients extends React.Component {

    state = {currentTab: "bun"}

    setCurrent = (currentValue) => {
        this.setState({currentTab: currentValue});

        window.location.href = '/#' + currentValue;
    }

    render(props) {
        return (
            <section style={{flexBasis: "content", width: "50%"}}>
                <div style={{display: 'flex'}}>
                    <Tab value="bun" active={this.state.currentTab === 'bun'} onClick={this.setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={this.state.currentTab === 'sauce'} onClick={this.setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="main" active={this.state.currentTab === 'main'} onClick={this.setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div>
                    <ul className={style.ul}>
                        <h2 className="text text_type_main-medium mt-15 mb-15">Булки</h2><a name="bun"></a>
                        {this.props.data.filter(x => x.type === "bun").map((item, index) => (
                            <li key={index}>
                                <Ingredient image={item.image} name={item.name} price={item.price} count={3}></Ingredient>
                            </li>
                        ))}
                        <h2 className="text text_type_main-medium mt-15 mb-15">Соусы</h2><a name="sauce"></a>
                        {this.props.data.filter(x => x.type === "sauce").map((item, index) => (
                            <li key={index}>
                                <Ingredient image={item.image} name={item.name} price={item.price} count={2}></Ingredient>
                            </li>
                        ))}
                        <h2 className="text text_type_main-medium mt-15 mb-15">Начинка</h2><a name="main"></a>
                        {this.props.data.filter(x => x.type === "main").map((item, index) => (
                            <li key={index}>
                                <Ingredient image={item.image} name={item.name} price={item.price} count={1}></Ingredient>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        )
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number
        }))
}

export default BurgerIngredients