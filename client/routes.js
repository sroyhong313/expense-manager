import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './components/App'

//create one Route that renders App component
export const Routes = () => (
    <Switch>
        <Route exact path = '/' component = {App} />
    </Switch>
);

export default Routes;