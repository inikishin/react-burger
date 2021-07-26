import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from '../../pages/homepage';
import LoginPage from "../../pages/loginpage";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password-page";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}><HomePage /></Route>
                <Route path="/login" exact={true}><LoginPage /></Route>
                <Route path="/register" exact={true}><RegisterPage /></Route>
                <Route path="/forgot-password" exact={true}><ForgotPasswordPage /></Route>
            </Switch>
        </Router>
)
    ;
}

export default App;
