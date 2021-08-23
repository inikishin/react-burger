import {TFeedActions} from "../services/actions/feed";
import {TAuthActions} from "../services/actions/auth";
import {TOrderActions} from "../services/actions/order";
import {TIngredientsActions} from "../services/actions/ingredients";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TRootState} from "../services/reducers";
import {store} from '../index';

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

type TApplicationActions = TFeedActions | TAuthActions | TOrderActions | TIngredientsActions;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch;

export interface IAppLocation {
    from?: {
        key: string,
        pathname: string,
        search: string,
        hash: string
    },
    background?: {
        key: string,
        pathname: string,
        search: string,
        hash: string,
        state: IAppLocation
    }
};