import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from '../../pages/home';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFound404 from "../../pages/not-found-404";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}><HomePage /></Route>
                <Route path="/login" exact={true}><LoginPage /></Route>
                <Route path="/register" exact={true}><RegisterPage /></Route>
                <Route path="/forgot-password" exact={true}><ForgotPasswordPage /></Route>
                <Route path="/reset-password" exact={true}><ResetPasswordPage /></Route>
                <Route path="/profile" exact={true}><ProfilePage /></Route>
                <Route><NotFound404 /></Route>
            </Switch>
        </Router>
)
    ;
}

export default App;
