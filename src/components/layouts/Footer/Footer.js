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

              
                <section className="col-6">
                  <h4>Menu</h4>
                  <ul>
                      <li><Link to="/">Accueil</Link></li>
                      <li><Link to="/participer-aux-scenes">Participer aux scènes</Link></li>
                      <li><Link to="/chant-de-maelie">Participer au "Chant de Maélie"</Link></li>
                      <li><Link to="/informations">Informations</Link></li>
                  </ul>

                </section>
                <section className={`${styles.adminSection} col-6`}>
                  <h4>Administration</h4>
                  <button className="beige" onClick={ currentUser ? logout : login }>
                    {currentUser ? "Déconnexion" : "Se connecter"}
                  </button>
                  <ul>
                      { currentUser ? <li><Link to="/administration">Administration</Link></li> : ""}
                  </ul>
            
                </section>
              </div>
              
          </footer>
    );
  }
  
export default Footer;