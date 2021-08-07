import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../services/actions/ingredients";

function IngredientPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const { ingredients } = useSelector(store => ({...store.ingredients}));
    const ingredient = ingredients.filter(item => item._id === id)[0];

    return (
            <IngredientDetails {...ingredient} />
    )
}

export default IngredientPage;