import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import mySaga from './sagas';
import rootReducer from './reducers';

const __DEV__ = process.env.NODE_ENV !== 'production';
const defaultState = {};
const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware];
if(__DEV__) {
  middlewares.push(reduxLogger);
}

const widthDevTools = compose(applyMiddleware(...middlewares), 
                      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer, defaultState, widthDevTools);

sagaMiddleware.run(mySaga);

export default store;
