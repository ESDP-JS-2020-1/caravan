import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import usersReducer from "./reducer/usersReducer";
import thunkMiddleware from "redux-thunk";
import {loadFromLocalStorage, localStorageMiddleware} from "./localStorage";
import productsReducer from "./reducer/productsReducer";
import historiesReducer from "./reducer/historiesReducer";
import requestsReducer from "./reducer/requestsReducer";
import languageReducer from "./reducer/languageReducer";
import groupReducer from "./reducer/groupReducer";
import statisticsReducer from "./reducer/statisticsReducer";
import trashReducer from "./reducer/trashReducer";
import loadingReducer from "./reducer/loadingReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    products: productsReducer,
    histories: historiesReducer,
    requests: requestsReducer,
    language: languageReducer,
    groups: groupReducer,
    statistics: statisticsReducer,
    trashReducer: trashReducer,
    loading: loadingReducer
});

const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    localStorageMiddleware
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedState, enhancers);

export default store;