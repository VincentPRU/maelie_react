import { useEffect } from 'react';


import { useNavigate } from 'react-router-dom';

import Select from '../../../components/forms/fields/Select/Select'
import styles from './AdminPage.module.scss'

import { useAuth } from '../../../contexts/AuthContext'


const AdminPage = () => {

    const navigate = useNavigate();

    //To know if the user is logged in
    const { currentUser } = useAuth();



    //Verify if the user is logged in. If not of if the status change, then, he is redirect to home page
    useEffect(() => {
      //Prevent from been undefined at the begenning
      if(typeof currentUser === 'object'){
        if(!currentUser) {
          navigate("/");
        }
      }

    }, [currentUser])

    return (
      <section className={`${styles.adminPage} maxWidthPageContainer`}>
        <header className="col-12">
          <h3 className="col-12 pink">À que coucou SMCQ </h3>
          <h1 className="col-12 blue">Administration</h1>
        </header>
        <div className={`${styles.selectComponent} col-12`}>
        </div>
        <section className={`${styles.pageContent} col-12`}>
bfdb
        </section>
      </section>
    );

}
  
  
export default AdminPage;
  