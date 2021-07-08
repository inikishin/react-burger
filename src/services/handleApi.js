export const getIngredientRequest = async () => {
    return await fetch('https://norma.nomoreparties.space/api/ingredients');
}

export const getOrderNumberRequest = async (ingredientsIds) => {
    console.log(ingredientsIds);
    return await fetch('https://norma.nomoreparties.space/api/orders', {method: 'POST',
                            headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                      },
                            body: JSON.stringify({ingredients: ingredientsIds})
                            });
}