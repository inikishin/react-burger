import React from "react";
import renderer from 'react-test-renderer';
import AppHeader from "./app-header";
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore();

it('Тестируем AppHeader без авторизованного пользователя', () => {
    const initialState = {auth: {
        isAuthenticated: false
        }};
    const store = mockStore(initialState);

    const tree = renderer
        .create(<Provider store={store}><BrowserRouter>
            <AppHeader /></BrowserRouter>
        </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('Тестируем AppHeader c авторизованным пользователем', () => {
    const initialState = {auth: {
        isAuthenticated: true
        }};
    const store = mockStore(initialState);

    const tree = renderer
        .create(<Provider store={store}><BrowserRouter>
            <AppHeader /></BrowserRouter>
        </Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
