import React from "react";
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import IngredientDetails from "./ingredient-details";
import {Provider} from "react-redux";
import {BrowserRouter, MemoryRouter, Route, Switch} from "react-router-dom";

const mockStore = configureStore();


it('Тестируем ingredientDetails', () => {
    const initialState = {ingredients: {
        ingredients: [
            {_id: '1', name: 'Ingredient name', image_large: 'sime-img-url', calories: 100, proteins: 10, fat: 1, carbohydrates: 15}
        ]
    }};
    const store = mockStore(initialState);

    const tree = renderer
        .create(<Provider store={store}>
            <BrowserRouter>
                <MemoryRouter initialEntries={['/ingredient/1']}>
                    <Switch>
                        <Route path='/ingredient/:id'>
                            <IngredientDetails />
                        </Route>
                    </Switch>
                </MemoryRouter>
            </BrowserRouter>
        </Provider>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});