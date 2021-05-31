import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import style from "./app.module.css";

function App() {

    const url = 'https://norma.nomoreparties.space/api/ingredients';

    const [data, setData] = React.useState( []);
    const [hasError, setHasError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            fetch(url).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            }).then((d) => {
                if (typeof d.data === 'undefined') {
                    throw new Error("No data");
                } else {
                    setData(d.data);
                }
            }).catch(e => {
                setHasError(true);
            }).finally(function () {
                setIsLoading(false);
            });
        }

        getData();
    }, []);

    return (
    <>
        <AppHeader/>
        <div className={style.app}>
            <h1 className={`${style.sectionHeader} pt-5 pb-1`}><span className="text text_type_main-large">Соберите бургер</span>
            </h1>
            {(isLoading) ?
                <h2 className="text text_type_main-medium">Загрузка данных...</h2>
                :
                (data.length === 0 || hasError) ?
                    <h2 className="text text_type_main-medium">Ошибка при получении данных</h2>
                    :
                    <main className={style.mainDashboard}>
                        <BurgerIngredients data={data} />
                        <BurgerConstructor data={data} />
                    </main>
            }
        </div>
    </>
)
    ;
}

export default App;
