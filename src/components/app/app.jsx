import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from '../../pages/homepage';
import LoginPage from "../../pages/loginpage";
import RegisterPage from "../../pages/register";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}><HomePage /></Route>
                <Route path="/login" exact={true}><LoginPage /></Route>
                <Route path="/register" exact={true}><RegisterPage /></Route>
            </Switch>
        </Router>
)
    ;
}

export default App;
