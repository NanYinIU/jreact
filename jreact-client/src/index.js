import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Router /** , Route, Switch, Redirect */ } from 'react-router-dom';
import { Provider } from 'react-redux'
import BaseRouter from './router/baseRouter'
import { createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import history from './history'
import reducer from './reducers/reducers'
const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
)
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <BaseRouter />
        </Router>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
