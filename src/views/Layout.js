import React, {Suspense, lazy, useRef} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

/* Layouts */
import Footer from '../components/layouts/Footer/Footer';

/* Spinner component for the Suspence element */
import Spinner from '../utils/Spinner/Spinner'

const SceneForm = lazy(() => import('./pages/SceneForm/SceneForm'));
const Credits = lazy(() => import('./pages/Credits/Credits'));
const ChoraleFormPage = lazy(() => import('./pages/ChoraleForm/ChoraleFormPage'));
const Home = lazy(() => import('./pages/Home/Home'));
const Error404 = lazy(() => import('./pages/Errror/404/Error404'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));





const Layout = () => {

    const footerRef = useRef();

    const scrollToBottom = () => {
        footerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start", 
            inline: "start"
        })
    }


    return(

        <>
            <Router>
                <main> 
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<Home  scrollOverFooter={scrollToBottom} />}/>
                            <Route path="/participer-aux-scenes" element={<SceneForm />}/>
                            <Route path="/chant-de-maelie" element={<ChoraleFormPage />}/>
                            <Route path="/informations" element={<Credits />}/>
                            <Route path="/administration" element={<AdminPage />} />
                            <Route path="*" element={<Error404/>} />
                        </Routes>
                    </Suspense>
                </main>
                <div ref={footerRef} className="col-12">
                    <Footer  />
                </div>
            </Router>
        </>
    );
}

export default Layout;

