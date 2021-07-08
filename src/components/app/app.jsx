import React from 'react';
import { useSelector } from "react-redux";

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import style from "./app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {

    const {
        isLoadingIngredients,
        hasErrorIngredients,
        ingredients
    } = useSelector((state) => ({...state}));

    return (
    <>
        <AppHeader/>
        <div className={style.app}>
            <h1 className={`${style.sectionHeader} pt-5 pb-1`}><span className="text text_type_main-large">Соберите бургер</span>
            </h1>
            {(isLoadingIngredients) ?
                <h2 className="text text_type_main-medium">Загрузка данных...</h2>
                :
                ([ingredients].length === 0 || hasErrorIngredients) ?
                    <h2 className="text text_type_main-medium">Ошибка при получении данных</h2>
                    :
                    <main className={style.mainDashboard}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor/>
                        </DndProvider>
                    </main>
            }
        </div>
    </>
)
    ;
}

export default App;
