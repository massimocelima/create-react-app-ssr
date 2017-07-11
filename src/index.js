import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import 'normalize.css'

import './index.css';
import App from './components/App';
import createStore from "./store"
//import registerServiceWorker from './registerServiceWorker';

const store = createStore()

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
