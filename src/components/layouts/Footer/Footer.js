import React from 'react';
import { Link } from 'react-router-dom';
/* Component styling */
import styles from './Footer.module.scss';

import { useAuth } from '../../../contexts/AuthContext';



const Footer = () => {
  
    /* Authentication functionnalities */
    const { login, currentUser, logout } = useAuth();



    return (
          <footer className={`${styles.footer_Component} col-12`}>
            <div className="maxWidthPageContainer">

              
                <section className="col-4">

                  <ul>
                      <li><Link to="/">Accueil</Link></li>
                      <li><Link to="/participer-aux-scenes">Participer aux scènes</Link></li>
                      <li><Link to="/credits">Crédits du projet</Link></li>
                      <li><Link to="/chant-de-la-fin">Chant final</Link></li>
                      { currentUser ? <li><Link to="/administration">Administration</Link></li> : ""}
                  </ul>

                </section>
                <section className="col-4">

                </section>
                <section className="col-4">

                  
                  <button onClick={ currentUser ? logout : login }>
                    {currentUser ? "Déconnexion" : "Se connecter"}
                  </button>

                </section>
              </div>
              
          </footer>
    );
  }
  
export default Footer;