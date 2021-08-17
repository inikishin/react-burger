import React from "react";
import renderer from 'react-test-renderer';
import Ingredient from "./ingredient";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

it('Тестируем Ingredient', () => {
    const testIngredient = {image: 'some-img-url', name: 'Ingredient name', price: 100}
    const tree = renderer.create(<DndProvider backend={HTML5Backend}>
        <Ingredient ingredient={testIngredient} count={2} />
    </DndProvider>).toJSON();

    expect(tree).toMatchSnapshot();
});
