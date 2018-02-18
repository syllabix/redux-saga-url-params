/**
 * Include CSS
 * -----------
 * This is here so that we can hot-reload it later with webpack-dev-server.
 * In production, however, this needs to be included from the HTML file as a separate css file.
 */
import styles from './application/styles'; // eslint-disable-line no-unused-vars

//React
import React from 'react';
import { render } from 'react-dom';

//Redux
import { Provider } from 'react-redux';

//React Router
import {
    Router,
    Route,
    Switch
  } from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory';

//Application Imports
import store from './application/store';
import routes from './application/route';
import { history } from './application/util';

import { 
    MainNavigation,
    Search,
    Home
} from './application/view';

import * as views from './application/view';

import {
    Navigator
} from './application/component';

render((
    <Provider store={store}>
        <Router history={history}>
            <div className="application-wrapper">    
                <MainNavigation />
                <Switch>
                    {}
                </Switch>
                <Navigator views={views} />
            </div>
        </Router>
    </Provider>
), document.getElementById('app'));