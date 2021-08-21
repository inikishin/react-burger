import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {socketMiddleware} from "./services/middleware/socketMiddleware";

// Подключаем Redux DevTools и хранилище
import { rootReducer } from './services/reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware()));
// end Подключаем Redux DevTools

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
