import {createStore, compose as defaultCompose} from 'redux'
//import {createStore, applyMiddleware, compose as defaultCompose} from 'redux'
//import thunk from 'redux-thunk';
//import {middleware as reduxPackMiddleware} from 'redux-pack'
//import {initializeCurrentLocation} from 'redux-little-router'
//import {navigateMiddleware, gaTrackingMiddleware} from './middlewares'
import createReducer from './reducers'

export default function() {
    let compose = defaultCompose
    /* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:false */
    //if (process.env.NODE_ENV !== 'production' && typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    if ( typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
        // in development mode, if you install the Redux Devtools extension (see https://github.com/zalmoxisus/redux-devtools-extension)
        // then this will connect to the dev tools and allow you to inspect Redux state
        compose = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

    const enhancers = compose()//routerEnhancer, applyMiddleware(
        //thunk,
        //reduxPackMiddleware,
        //routerMiddleware,
        //navigateMiddleware,
        //gaTrackingMiddleware,
    //))

    // Grab the state from a global variable injected into the server-generated HTML
    const preloadedState = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : undefined
    if (preloadedState) {
        // Allow the passed state to be garbage-collected
        delete window.__PRELOADED_STATE__
    }

    // Create Redux store with initial state, if specified
    const store = createStore(createReducer(), preloadedState, enhancers)

    // dispatch the initial route
    //const initialLocation = store.getState().router
    //if (initialLocation) {
    //    store.dispatch(initializeCurrentLocation(initialLocation))
    //}

    return store
}
