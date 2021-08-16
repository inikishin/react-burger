import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useInView } from 'react-intersection-observer';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "./ingredient";
import style from "./burger-ingredients.module.css";
import {getIngredients} from "../../services/actions/ingredients";
import {Link, useLocation} from "react-router-dom";


function BurgerIngredients() {

    const location = useLocation();
    const [currentTab, setCurrentTab] = React.useState("bun");

    const { ingredients } = useSelector(store => ({...store.ingredients}));
    const dispatch = useDispatch();

    const [refBun, inViewBun] = useInView();
    const [refSauce, inViewSauce] = useInView();
    const [refMain, inViewMain] = useInView();

    useEffect(() => {
        if (inViewBun) {
            setCurrentTab('bun');
        }
        else if (inViewSauce) {
            setCurrentTab('sauce');
        }
        else if (inViewMain) {
            setCurrentTab('main');
        }
    }, [inViewBun, inViewSauce, inViewMain]);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

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
                    <h2 className="text text_type_main-medium mt-15 mb-15" ref={refBun}>Булки</h2><a name="bun" />
                    {ingredients.filter(x => x.type === "bun").map((item, index) => (
                        <li key={index}>
                            <Link key={item._id} to={{pathname: `/ingredients/${item._id}`, state: { background: location }}} className={style.ingredientLink}>
                                <Ingredient ingredient={item} count={item.counter}/>
                            </Link>
                        </li>
                    ))}
                    <h2 className="text text_type_main-medium mt-15 mb-15" ref={refSauce}>Соусы</h2><a name="sauce" />
                    {ingredients.filter(x => x.type === "sauce").map((item, index) => (
                        <li key={index}>
                            <Link key={item._id}
                                  to={{pathname: `/ingredients/${item._id}`, state: {background: location}}} className={style.ingredientLink}>
                                <Ingredient ingredient={item} count={item.counter}/>
                            </Link>
                        </li>
                    ))}
                    <h2 className="text text_type_main-medium mt-15 mb-15" ref={refMain}>Начинка</h2><a name="main" />
                    {ingredients.filter(x => x.type === "main").map((item, index) => (
                        <li key={index}>
                            <Link key={item._id}
                                  to={{pathname: `/ingredients/${item._id}`, state: {background: location}}} className={style.ingredientLink}>
                                <Ingredient ingredient={item} count={item.counter} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default BurgerIngredients