import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from 'App';
import { store } from 'store/store';

import './fonts/SB-Sans-Interface.woff';
import './fonts/SB-Sans-Interface.woff2';

import reportWebVitals from './reportWebVitals';

import './root.scss';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
