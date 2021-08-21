import React from "react";
import { Provider } from "react-redux";
import renderer from 'react-test-renderer';
import FeedOrder from "./feed-order";
import configureStore from 'redux-mock-store'; //ES6 modules

const mockStore = configureStore();

it('Компонент FeedOrder рендерится без ошибок', () =>{
    const testIngredients = ['1', '2']
    const initialState = {
        ingredients:
            {
                ingredients: [
                    {
                        _id: '1',
                        price: 100,
                        image_mobile: 'some-img-url'
                    },
                    {
                        _id: '2',
                        price: 200,
                        image_mobile: 'some-img-url'
                    }
                ]
            }
    }
    const store = mockStore(initialState);

    let today = new Date();
    today.setDate(today.getDate()-15);
    today.setHours(-6, 0);
    const tree = renderer
        .create(<Provider store={store}>
            <FeedOrder name="test name" createdAt={today.toISOString()} number={123} ingredients={testIngredients} status="done"/>
        </Provider>)
        .toJSON();

    expect(tree).toMatchSnapshot();
});