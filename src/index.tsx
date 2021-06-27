import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

// Подключаем Redux DevTools и хранилище
import { rootReducer } from './services/reducers/index';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const enhancer = composeWithDevTools(applyMiddleware(thunk));
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
