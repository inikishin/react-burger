import React from "react";
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from "./ingredient";

import style from "./burger-ingredients.module.css";

class BurgerIngredients extends React.Component {

    state = {currentTab: "bun"}

    setCurrent = (currentValue) => {
        this.setState({currentTab: currentValue});
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
                        {this.props.data.filter(x => x.type === this.state.currentTab).map((item, index) => (
                            <li key={index}>
                                <Ingredient image={item.image} name={item.name} price={item.price}></Ingredient>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        )
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.array
}

export default BurgerIngredients