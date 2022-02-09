import React, { useEffect, useState } from 'react';


import { firestore, storage } from '../../../firebase';
import FormContainer from '../../../components/forms/container/FormContainer';

import styles from './SceneForm.module.scss'




const SceneForm = () => {

      // store the file url in the state
    const [users, setUsers] = useState([]);//by default, empty array

    const [userForm, setUserForm] = useState({
      occupation: '',
      name: '',
      firstname: '',
      email: ''
    })

    const [mainForm, setMainForm] = useState({
      groupName: '',
      artistesName: '',
      school: '',
      age: null,
      city: '',
      country: '',
      audioFiles: [{
        audio1: "",
        audio2: "3",
        audio3: "",
        audio4: "",
        audio5: ""
      }]
    })

    
      const onSubmit = async (e) => {

        e.preventDefault();

        try{

          //Make sure that every feild in the UserForm is filled with something
          Object.keys(userForm).forEach(key => {
            if(!userForm.key){ throw new Error(`Tous les champs de la section personne contact doivent être complétés`); }
          })

        } catch(e){
          console.error(e);
          return; //exit the function
        }
        

        //Url of the media to be stored in the database
        let fileUrl = undefined;

        try {
            const file = e.target.audio.files[0];
            const storageRef = storage.ref(); 
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            fileUrl = await fileRef.getDownloadURL();
        } catch(error){
            alert('un problème est survenu avec vos fichier. Assurez-vous qu\'ils soient du bon type');
        }

    
        const username = e.target.username.value;

        if(!username){ return }
    
        try {
            await firestore.collection("users").doc(username).set({
                name: username,
                avatar: fileUrl
            })
            alert("Opération réussie");

        } catch (error){
            alert("Un problème est survenu avec l'enregistrement des données");
        }
        

      }
    
      useEffect(() => {
        const fetchUsers = async () => {
          const usersCollection = await firestore.collection('users').get();
          setUsers(usersCollection.docs.map(doc => {
            return doc.data();
          }))
        }
        fetchUsers();
      }, [])

    return (

        <div className={`${styles.pageStyling} maxWidthPageContainer`}>

            <h1>Participez vous aussi à la mise en musique des scènes de ce conte...</h1>
            <button onClick={() => {console.log({...mainForm})}}>Inspecter le user</button>

            <form onSubmit={onSubmit} className="col-12">

                {/* Section with all the personnal informations */}
                <FormContainer>
                <div className={styles.formCategorie}>
                  <h3>Personne contact</h3>
                  <small>Ces informations resteront confidentielles</small>
                  <label>
                    Je suis un.e :<br/>
                    <select name="occupation" value={ userForm.occupation } onChange={(e) => setUserForm({ ...userForm, occupation: e.target.value})} required>
                        <option value="">-</option>
                        <option value="eleve">Élève</option>
                        <option value="enseignant">Enseignant.e</option>
                        <option value="parent">Parent</option>
                        <option>Autre</option>
                    </select>
                  </label>

                  <input type="text" name="name" placeholder="Nom" required onChange={(e) => setUserForm({ ...userForm, name: e.target.value})} />
                  <input type="text" name="firstname" placeholder="Prénom" required onChange={(e) => setUserForm({ ...userForm, firstname: e.target.value})} />
                  <input type="email" name="email" placeholder="Courriel" required  onChange={(e) => setUserForm({ ...userForm, email: e.target.value})}/>
                </div>
                </FormContainer>

                {/* Section with credits */}
                <div className={styles.formCategorie}>
                  <h3>Crédits</h3>
                  <small>Les informations suivantes apparaîtront dans l'application</small>
                  <label>
                    Nom d'artiste ou de groupe<br/>
                    <input type="text" name="groupName" onChange={(e) => setMainForm({ ...mainForm, groupName: e.target.value})} />
                  </label>
                  <label>
                    Nom du ou des jeunes qui ont participé à la bande sonore<br/>
                    <textarea type="text" name="artistesName" onChange={(e) => setMainForm({ ...mainForm, artistesName: e.target.value})} />
                  </label>
                  <label>
                    École<br/>
                    <input type="text" name="school" onChange={(e) => setMainForm({ ...mainForm, school: e.target.value})} />
                  </label>
                  <label>
                    Âge<br/>
                    <select name="age" onChange={(e) => setMainForm({ ...mainForm, age: parseInt(e.target.value)})}>
                      <option value=""></option>
                      {Array.from(Array(100).keys()).map(option => {
                        return <option key={`age-${option}`} value={option}>{option}</option>
                      })}
                    </select>
                  </label>
                  <label>
                    Municipalité<br/>
                    <input type="text" name="city" onChange={(e) => setMainForm({ ...mainForm, city: e.target.value})} />
                  </label>
                  <label>
                    Pays<br/>
                    <input type="text" name="country" onChange={(e) => setMainForm({ ...mainForm, country: e.target.value})} />
                  </label>

                </div>

                {/* Section with audio files */}
                <div className={styles.formCategorie}>
                  
                  <label>
                    Fichier audio - Scène 1<br/>
                    <input type="file" name="audio_scene1"/>
                  </label>
                  <label>
                    Fichier audio - Scène 2<br/>
                    <input type="file" name="audio_scene2"/>
                  </label>
                  <label>
                    Fichier audio - Scène 3<br/>
                    <input type="file" name="audio_scene3"/>
                  </label>
                  <label>
                    Fichier audio - Scène 4<br/>
                    <input type="file" name="audio_scene4"/>
                  </label>
                  <label>
                    Fichier audio - Scène 5<br/>
                    <input type="file" name="audio_scene5"/>
                  </label>


                </div>
                <button>Submit</button>
            </form>


{/*
            <ul>
                {users.map(user => {
                return <li key={user.name}><img width="100" height="100" src={user.avatar} alt={user.name}/><p>{user.name}</p></li>
                })}
            </ul>   
*/}
        </div>
    );
}


export default SceneForm;