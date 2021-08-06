import React from 'react';
import {BrowserRouter as Router, Switch, Route, useLocation, useHistory} from 'react-router-dom';

import HomePage from '../../pages/home';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFound404 from "../../pages/not-found-404";
import IngredientPage from "../../pages/ingredient";
import {ProtectedRoute} from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

function ModalSwitch() {
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;

    const closeModal = (e) => {
        history.goBack();
    }

    const modal = (
        <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails  />
        </Modal>
    );

    return (
        <>
            <Switch location={background || location}>
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

            {background && <Route path="/ingredients/:id" children={modal}/>}
        </>
    );
}

export default App;
