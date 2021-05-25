import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import style from "./app.module.css";
import data from "../../utils/data";

function App() {
  return (
    <div className={style.app}>
        <AppHeader/>
        <p className={style.sectionHeader}><span className="text text_type_main-large">Соберите бургер</span></p>
        <main className={style.mainDashboard}>
            <BurgerIngredients data={data}></BurgerIngredients>
            <BurgerConstructor data={data}></BurgerConstructor>
        </main>
    </div>
  );
}

export default App;
