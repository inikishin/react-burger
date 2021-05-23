import React from 'react';
import './App.css';

import AppHeader from './components/app-header/AppHeader';
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";

import data from "./utils/data";

function App() {
  return (

    <div className="App">
        <AppHeader/>
        <p className="text text_type_main-large p-5 m-5" style={{textAlign: "left"}}>Соберите бургер</p>
        <main style={{display:"flex", justifyContent:"center"}}>
            <BurgerIngredients data={data}></BurgerIngredients>
            <BurgerConstructor data={data}></BurgerConstructor>
        </main>
    </div>
  );
}

export default App;
