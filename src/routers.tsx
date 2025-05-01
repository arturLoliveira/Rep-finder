import React from 'react';

import { Routes, Route } from 'react-router-dom';

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
import ProtectedRoute from "./services/protectedRoutes";


const Routers: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<RepublicasMap />} />
            <Route path="/republicas/create" element={<CreateRepublica />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/republicas/:id" element={<Republica />} />
            <Route path="/republicasEdit/:id" element={
                <ProtectedRoute requiredRole="admin">
                    <EditRepublica />
                </ProtectedRoute>
            }
            />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/successLogin" element={<SuccessLogin />} />
            <Route path="/successLogout" element={<SuccessLogout />} />
            <Route path="/exclude" element={
                <ProtectedRoute requiredRole="admin">
                    <ExcludePage />
                </ProtectedRoute>
            }
            />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default Routers;