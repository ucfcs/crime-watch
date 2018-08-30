
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//Import the root reducer
import reducers from './rootReducer'; 

const enhancer = compose(applyMiddleware(thunk));

export default createStore(reducers, enhancer);