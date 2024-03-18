import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../services/AuthServices';
import EditRepublica from '../pages/EditRepublica';
import ExcludePage from '../pages/ExcludePage';

const ProtectedRouteExclude: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
    const auth = useAuth();

    if (!Component) return null;

    return (
        <Route {...rest} render={(props) => (
            auth.user
                ? <ExcludePage />
                : <Redirect to="/login" />
        )} />
    );
};

export default ProtectedRouteExclude;
