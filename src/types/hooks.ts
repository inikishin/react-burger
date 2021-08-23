import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';
import {TRootState} from "../services/reducers";
import {AppDispatch, AppThunk} from "./index";

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();