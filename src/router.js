import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import App from './App';

const RouterConfig = (props) => (
    <Router history={props.history}>
        <Switch>
            <Route path='/' component={App} />
        </Switch>
    </Router >
);

export default RouterConfig