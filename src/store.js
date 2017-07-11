//import thunk from 'redux-thunk';
//import {middleware as reduxPackMiddleware} from 'redux-pack'
//import {navigateMiddleware, gaTrackingMiddleware} from './middlewares'
import { createStore, applyMiddleware, compose as defaultCompose, combineReducers } from 'redux'
import reducers from './reducers'
import { connectRoutes } from 'redux-first-router'
import restoreScroll from 'redux-first-router-restore-scroll'
import routesMap, { options } from './routesMap'
import {canUseDom} from "./utils/dom"

export default function(history) {

    const { reducer, middleware, enhancer, thunk } = connectRoutes(
        history,
        routesMap,
        {
            ...options,
            restoreScroll: canUseDom && restoreScroll({})
        }
    )

    let compose = defaultCompose
    /* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:false */
    //if (process.env.NODE_ENV !== 'production' && typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    if ( typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
        // in development mode, if you install the Redux Devtools extension (see https://github.com/zalmoxisus/redux-devtools-extension)
        // then this will connect to the dev tools and allow you to inspect Redux state
        compose = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

    const rootReducer = combineReducers({ ...reducers, location: reducer })
    const middlewares = applyMiddleware(
        middleware,
        //thunk,
        //gaTrackingMiddleware,
    )
    const enhancers = compose(enhancer, middlewares)

    // Grab the state from a global variable injected into the server-generated HTML
    const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined
    if (preloadedState) {
        // Allow the passed state to be garbage-collected
        delete window.__PRELOADED_STATE__
    }

    // Create Redux store with initial state, if specified
    const store = createStore(rootReducer, preloadedState, enhancers)

    if (module.hot && process.env.NODE_ENV === 'development') {
        module.hot.accept('./reducers/index', () => {
            const reducers = require('./reducers/index')
            const rootReducer = combineReducers({ ...reducers, location: reducer })
            store.replaceReducer(rootReducer)
        })
    }

    return { store, thunk }
}
