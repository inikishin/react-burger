import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HomePage from '../../pages/home';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFound404 from "../../pages/not-found-404";
import IngredientPage from "../../pages/ingredient";
import {ProtectedRoute} from "../protected-route/protected-route";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}><HomePage/></Route>
                <Route path="/login" exact={true}><LoginPage/></Route>
                <Route path="/register" exact={true}><RegisterPage/></Route>
                <Route path="/forgot-password" exact={true}><ForgotPasswordPage/></Route>
                <Route path="/reset-password" exact={true}><ResetPasswordPage/></Route>
                <ProtectedRoute path="/profile" exact={true}><ProfilePage/></ProtectedRoute>
                <ProtectedRoute path="/profile/orders" exact={true}></ProtectedRoute>
                <ProtectedRoute path="/profile/orders/:id" exact={true}></ProtectedRoute>
                <Route path={'/ingredients/:id'}><IngredientPage/></Route>
                <Route><NotFound404/></Route>
            </Switch>
        </Router>
    )
        ;
}

export default App;
