import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import {
  connectRouter,
  routerMiddleware,
} from 'connected-react-router/immutable';
import { combineReducers } from 'redux-immer';
import createSagaMiddleware from 'redux-saga';
import produce from 'immer';

import appReducer from '@app/modules/reducer';
import appSagas from '@app/modules/sagas';
import detailsReducer from './detailsReducer';
import search_reducer from './searchReducer';
import genreReducer from './genreReducer';

export const immerHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(immerHistory);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [sagaMiddleware, routeMiddleware];

const composed = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(
  combineReducers(produce, {
    router: connectRouter(immerHistory),
    app: appReducer,
    details:detailsReducer,
    search :search_reducer,
    genres: genreReducer,
  }),
  {},
  composed
);

sagaMiddleware.run(appSagas);

export default store;
