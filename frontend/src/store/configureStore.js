import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from "redux-thunk";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
});

const middlewares = [
    thunk,
    routerMiddleware(history),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, enhancers);