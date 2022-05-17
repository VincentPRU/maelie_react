import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button'
/* Component styling */
import styles from './Footer.module.scss';

import { useAuth } from '../../../contexts/AuthContext';

//Images
import azrieli from '../../../images/logos/Azrieli Logo ENG-FR Final_NOIR.svg'
//import CSSDM from '../../../images/logos/Logo transparent CSSDM.png'
import MCCQ from '../../../images/logos/Culture_et_Communications_Québec.svg'
import CSSDM from '../../../images/logos/CSSMontreal_inverse.svg'



const Footer = () => {
  
    /* Authentication functionnalities */
    const { login, currentUser, logout } = useAuth();



    return (
          <footer className={`${styles.footer_Component} col-12`}>
            <div className="maxWidthPageContainer">
              
                <section>
                  <h4>Menu</h4>
                  <ul className={styles.footerMenu}>
                      <li><Button reverse color="white" to="/">Accueil</Button></li>
                      <li><Button reverse color="white" to="/participer-aux-scenes">Participer aux scènes</Button></li>
                      <li><Button reverse color="white" to="/chant-de-maelie">Participer au "Chant de Maélie</Button></li>
                      <li><Button reverse color="white" to="/informations">Informations</Button></li>
                  </ul>
                </section>

                <section>
                  <h4>Crédits</h4>
                  <ul className={styles.credits}>
                    <li>Texte : <span>Marianne Gagnon, 9 ans</span></li>
                    <li>Musique (Chanson de Maélie) : <span>Denis Gougeon</span></li>
                    <li>Illustrations : <span>Geneviève Bigué</span></li>
                    <li>Conception web : <span>Vincent Poirier Ruel</span></li>
                    <li>Guide pédagogique : <span>Claire Cavanagh et Hélène Lévesque (CSSDM)</span></li>
                    <li>Idée originale et coordination : <span>Claire Cavanagh</span></li>
                    <li className={styles.noDisc}>© Production SMCQ Jeunesse 2022</li>
                  </ul>
                  <div className={`col-12 ${styles["logo-container"]}`}>
                    <img className={styles.logo} src={azrieli} alt="Logo de la fondation Azrieli"/>
                    <img className={styles.logo} src={MCCQ} alt="Logo du Ministère de la Culture et des Communications"/>
                    <img className={styles.logo} src={CSSDM} alt="Logo du Centre de services scolaire de Montréal"/>

                  </div>
                </section>

                <section className={`${styles.adminSection}`}>
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