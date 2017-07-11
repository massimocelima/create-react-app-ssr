import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import App from './components/App';
import createStore from "./store"
//import registerServiceWorker from './registerServiceWorker';

import 'normalize.css'
import './index.css';

const {store} = createStore(createHistory())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default
        ReactDOM.render(
            <Provider store={store}>
                <NextApp />
            </Provider>,
            document.getElementById('root')
        )
    })
}

//registerServiceWorker();
