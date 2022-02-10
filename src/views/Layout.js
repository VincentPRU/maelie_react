import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';


import SceneForm from './pages/SceneForm/SceneForm';
import ChoraleFormPage from './pages/ChoraleForm/ChoraleFormPage';
import Credits from './pages/Credits';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import Error404 from './pages/Errror/404/Error404';

/* Layouts */
import Footer from '../components/layouts/Footer/Footer';


const Layout = () => {

    //To know if the user is logged in
    const { currentUser } = useAuth();

    return(

        <>
            <Router>
                <main> 
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/participer-aux-scenes" element={<SceneForm />}/>
                            <Route path="/credits" element={<Credits />}/>
                            <Route path="/chant-de-la-fin" element={<ChoraleFormPage />}/>
                            <Route path="/administration" element={currentUser ? <AdminPage /> : <Navigate to="/" /> } />
                            <Route path="*" element={<Error404/>} />
                        </Routes>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default Layout;

