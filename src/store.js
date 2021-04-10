import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './view/reducer';

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(logger, thunk)));
export default store;
// const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);
// console.log('createStoreWithMiddleware', createStoreWithMiddleware(reducer).getState())
// export default createStoreWithMiddleware(reducer);
