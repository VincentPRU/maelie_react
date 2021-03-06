import { useEffect, useState, Suspense } from 'react';

import firebase from '../../../firebase'

import { useNavigate } from 'react-router-dom';

//Database methods
import { getSceneFormData, getMaelieSongFormData } from './utils/dbQueries'

/* Spinner component for the Suspence element */
import Spinner from '../../../utils/Spinner/Spinner'

//Import components
import Select from '../../../components/forms/fields/Select/Select'
import AdminCard from '../../../components/layouts/AdminCard/AdminCard'

//Styling
import styles from './AdminPage.module.scss'

import { useAuth } from '../../../contexts/AuthContext'



const AdminPage = () => {

    //Display modes for the two sections
    const [displaySceneSection, setDisplaySceneSection] = useState({displayOptions: '0'})
    const [displaySongSection, setDisplaySongSection] = useState({displayOptions: '0'})

    //Scene form data fetching
    const [sceneFormData, setSceneFormData] = useState(null)
    //Maelie's song form data
    const [maelieFormData, setMaelieFormData] = useState(null)

    //Update display of cards
    const [updateDisplay, setUpdateDisplay] = useState(true)
    const iterateChange = () => setUpdateDisplay(!updateDisplay)
    

    useEffect(() => {
      getSceneFormData().then(setSceneFormData)
      getMaelieSongFormData().then(setMaelieFormData)
    }, [updateDisplay])


  
    /*

        Does the user have the permission to be in this page ?
        If not, redirect to home page

    */
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

    /*
          Selecti field values
    */
   const userFormDisplay = [
     {value: 0, text: "Tous les champs"},
     {value: 1, text: "Accept??s"},
     {value: 2, text: "En attente"},
     {value: 3, text: "Refus??s"}, 
     {value: 4, text: "Masquer la section"} 
    ];
   

/*    const sayHelloClick = () => {
        const sendEmail = firebase.functions().httpsCallable('sendEmail');
        sendEmail().then(result => {
          console.log(result.data)
        })
    }
*/
    return (
      <section className={`${styles.adminPage} maxWidthPageContainer`}>

        <Suspense fallback={<Spinner/>}>
        {/* General page header */}
        <header className="col-12">
          <h3 className="col-12 pink">Ah que coucou SMCQ </h3>
          <h1 className="col-12 blue">Administration</h1>
        </header>

        {/* Scenes section */}
        <div className={`${styles.subHeader} col-12`}>
          <h3>Formulaires de sc??nes</h3>
          <form>
            <Select data={displaySceneSection} setData={setDisplaySceneSection} name="displayOptions" horizontalAlignment isRequired={false} text="Mode d'affichage :">
                {userFormDisplay}
            </Select>
          </form>
        </div>
        
        {/* Option five : hide element*/}
        { displaySceneSection.displayOptions !== '4' &&


          <>  
          {/* Option one : display three categories */}
          { displaySceneSection.displayOptions === '0' &&
          <>
            <section className={`${styles.pageContent} ${styles['col-4-1rem']} `}>
              {/* Deleted elements */}
              <h4 className="red">Formulaires refus??s</h4>
              {
                sceneFormData && 
                  sceneFormData.map(element => (
                    element.status === 'refused' && <AdminCard key={element.id} updateChange={iterateChange} sceneForm={true} data={element} />  
                  ))
              }
            </section>
            <section className={`${styles.pageContent} ${styles['col-4-1rem']}`}>
              {/* Waiting for approuval elements */}
              <h4 className="yellow">En attente d'approbation</h4>
              {
                sceneFormData && 
                  sceneFormData.map(element => (
                    (element.status === undefined || element.status === "") && <AdminCard key={element.id} updateChange={iterateChange} sceneForm={true} data={element} />
                  ))
              }
            </section>
            <section className={`${styles.pageContent} ${styles['col-4-1rem']}`}>
              {/* Approved elements */}
              <h4 className="green">Formulaires approuv??s</h4>
              {
                sceneFormData && 
                  sceneFormData.map(element => (
                    element.status === 'accepted' && <AdminCard key={element.id} updateChange={iterateChange} sceneForm={true} data={element} />
                  ))
              }
            </section>
          </>
          }

          {/* Option two : display only accepted */}
          { displaySceneSection.displayOptions === '1' &&
            <section className={`${styles.pageContent} col-12`}>
              {
                sceneFormData && 
                  sceneFormData.map(element => (
                    element.status === 'accepted' && <AdminCard key={element.id} updateChange={iterateChange} sceneForm={true} data={element} />
                  ))
              }
            </section>
          }


          {/* Option three : display only in waiting */}
          { displaySceneSection.displayOptions === '2' &&
            <section className={`${styles.pageContent} col-12`}>
              {
                sceneFormData && 
                  sceneFormData.map(element => (
                    (element.status === undefined || element.status === "") && <AdminCard key={element.id} updateChange={iterateChange} sceneForm={true} data={element} />
                  ))
              }
            </section>
          }

          {/* Option four : display only refused elements */}
          { displaySceneSection.displayOptions === '3' &&
            <section className={`${styles.pageContent} col-12`}>
              {
                sceneFormData && 
                  sceneFormData.map(element => (
                    element.status === 'refused' && <AdminCard key={element.id} updateChange={iterateChange} sceneForm={true} data={element} />
                  ))
              }
            </section>
          }
          </>

          
        }

        {/* 
        
        
            Maelie's song section 
            
            
        */}

          <div className={`${styles.subHeader} col-12`}>
            <h3>Formulaires du chant de Maelie</h3>
            <form>
              <Select data={displaySongSection} setData={setDisplaySongSection} name="displayOptions" horizontalAlignment isRequired={false} text="Mode d'affichage :">
                  {userFormDisplay}
              </Select>
            </form>
          </div>
          { maelieFormData && displaySongSection.displayOptions !== '4' &&

          <>
            {/* Option one : display three categories */}
            { displaySongSection.displayOptions === '0' &&
            <>
              <section className={`${styles.pageContent} ${styles['col-4-1rem']} `}>
                {/* Deleted elements */}
                <h4 className="red">Formulaires refus??s</h4>
                {
                    maelieFormData.map(element => (
                      element.status === 'refused' && <AdminCard key={element.id}  updateChange={iterateChange} data={element} />  
                    ))
                }
              </section>
              <section className={`${styles.pageContent} ${styles['col-4-1rem']}`}>
                {/* Waiting for approuval elements */}
                <h4 className="yellow">En attente d'approbation</h4>
                {
                    maelieFormData.map(element => (
                      (element.status === undefined || element.status === "") && <AdminCard key={element.id}  updateChange={iterateChange} data={element} />
                    ))
                }
              </section>
              <section className={`${styles.pageContent} ${styles['col-4-1rem']}`}>
                {/* Approved elements */}
                <h4 className="green">Formulaires approuv??s</h4>
                {
                    maelieFormData.map(element => (
                      element.status === 'accepted' && <AdminCard key={element.id} updateChange={iterateChange} data={element} />
                    ))
                }
              </section>
            </>
            }

            {/* Option two : display only accepted */}
            { displaySongSection.displayOptions === '1' &&
              <section className={`${styles.pageContent} col-12`}>
                {
                    maelieFormData.map(element => (
                      element.status === 'accepted' && <AdminCard key={element.id} updateChange={iterateChange} data={element} />
                    ))
                }
              </section>
            }

            {/* Option three : Waiting for approuval elements */}
            { displaySongSection.displayOptions === '2' &&
              <section className={`${styles.pageContent} col-12`}>
                {
                    maelieFormData.map(element => (
                      (element.status === undefined || element.status === "") && <AdminCard key={element.id} updateChange={iterateChange} data={element} />
                    ))
                }
              </section>
            }

            {/* Option gour : refused elements */}
            { displaySongSection.displayOptions === '3' &&
              <section className={`${styles.pageContent} col-12`}>
                {
                    maelieFormData.map(element => (
                      element.status === 'refused' && <AdminCard key={element.id} updateChange={iterateChange} data={element} />
                    ))
                }
              </section>
            }
            </>

          }
          </Suspense>

      </section>
    );

}
  
  
export default AdminPage;
  