import React from 'react';
import { useSelector } from "react-redux";

import HomePage from '../../pages/homepage';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </Router>
)
    ;
}

export default App;
