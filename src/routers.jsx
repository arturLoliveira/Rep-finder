import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import RepublicasMap from './pages/RepublicasMap';
import Republica from './pages/Republica';
import CreateRepublica from './pages/CreateRepublica';
import SuccessPage from './pages/SuccessPage';
import SuccessLogin from './pages/SuccessLogin';
import SuccessLogout from './pages/SuccessLogout';
import ExcludePage from './pages/ExcludePage';
import EditRepublica from './pages/EditRepublica';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { AuthProvider } from './services/AuthServices';
import ProtectedRoute from './services/ProtectedRoute';
import ProtectedRouteExclude from './services/ProtectedRouteExclude';

function Routers() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/app" component={RepublicasMap} />
                    <Route path="/republicas/create" component={CreateRepublica} />
                    <Route path="/users/create" component={CreateUser} />
                    <Route path="/republicas/:id" component={Republica} />
                    <ProtectedRoute path="/republicasEdit/:id" component={EditRepublica} />
                    <Route path="/success" component={SuccessPage} />
                    <Route path="/successLogin" component={SuccessLogin} />
                    <Route path="/successLogout" component={SuccessLogout} />
                    <ProtectedRouteExclude path="/exclude" component={ExcludePage} />
                    <Route path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default Routers;