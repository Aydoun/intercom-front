import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import mySaga from './sagas';
import rootReducer from './reducers';

const defaultState = {};
const sagaMiddleware = createSagaMiddleware();
const widthDevTools = compose(applyMiddleware(sagaMiddleware, reduxLogger), 
                      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(rootReducer, defaultState, widthDevTools);

sagaMiddleware.run(mySaga);

export default store;
