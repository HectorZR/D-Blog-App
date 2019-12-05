import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createPromise } from 'redux-promise-middleware';

import AppReducer from './AppReducer';
import MetamaskReducer from './MetamaskReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

export function configureStore() {
	const middlewares = [
		thunk,
		createPromise({
			promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
		}),
	];
	return createStore(
		rootReducer(), 
		{},
		(composeEnhancers && composeEnhancers(applyMiddleware(...middlewares)) )|| applyMiddleware(...middlewares)
	);
};

// reducers
function rootReducer() {
	return combineReducers({
		AppReducer,
		MetamaskReducer
	});
}

