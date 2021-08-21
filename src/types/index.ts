export type TIngredient = {
    _id: string,
    type: "bun" | "main" | "sauce",
    name: string,
    price: number,
    image_large: string,
    image_mobile: string,
    image: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    counter?: number,
    key?: string,
};

export type TOrder = {
    _id: string,
    name: string,
    createdAt: string,
    number: number,
    status: string,
    ingredients: Array<string>
};