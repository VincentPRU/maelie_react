import React, {useState} from 'react';

import { firestore, storage } from '../../../firebase';

import FormContainer from '../../../components/forms/container/FormContainer';
import ContactForm from '../../../components/forms/form/contactForm/ContactForm';
import ChoralForm from '../../../components/forms/form/ChoralForm/ChoralForm';
import ChoralAudioForm from '../../../components/forms/form/ChoralAudioForm/ChoralAudioForm';

import styles from './ChoraleFormPage.module.scss';


const ChoraleFormPage = () => {

  const [userForm, setUserForm] = useState({
    occupation: '',
    name: '',
    firstname: '',
    email: ''
  })

  const [mainForm, setMainForm] = useState({
    choristNames: '',
    school: '',
    age: null,
    city: '',
    country: '',
    contactRef: null,
    audioFiles: {
      audio1: null
    }
  })

  const [audioForm, setAudioForm] = useState({
    audio1: null
  })

    const onSubmit = async (e) => {

      e.preventDefault();


      //Extract the data from the three states to submit it without delay
      let userFormData = { ...userForm };
      let mainFormData = { ...mainForm };
      let audioFormData = { ...audioForm };

      /* The next two steps are stored into functions and before the rest so we make sure they are only executed if the previous function is done and called them*/
      const submittingStepTwo = async () => {
        /*
      * 
      *     Submitting step two => contact infos
      * 
      */

          try{
              //Add the new document to the collection and keep trace of the id
              const { id } = await firestore.collection("contact").add(userFormData);

              //Save Id in larger scope for later
              mainFormData = { ...mainFormData, contactRef: id}

              //Once it is done, and if there is no error, call the next step function 
              submittingStepThree();

            } catch(e){
              console.error(e);
              alert("Un problème est survenue. Assurez-vous que les données de contact que vous avez fournies sont du bon format.")
              return; //Stop the process
            }
      }

      const submittingStepThree = async () => {
        /*
      * 
      *     Submitting step three => main infos
      * 
      */
            try{
              
              //Add the main form data to the firestore collection as a new document
              //Include the new id as a reference
              await firestore.collection("choral").add(mainFormData)
              console.log(mainFormData);
              alert("Félicitations. Les informations ont bien été enregistrées");


            } catch(e){
              console.error(e);
              return; //Stop the process
            }
      }


      /*
        * 
        *     Validation step one => validation of the audio files
        * 
        * 
        */

       if(!audioFormData.audio1){
         alert("Vous devez inclure un fichier audio avec ce formulaire");
         return;
       }

        /*
          * 
          *     Validation step two => validation of the user form
          * 
          * 
          */

        try{
          //Make sure that every feild in the UserForm is filled with something
          Object.keys(userFormData).forEach(key => {
            if(!userFormData[key]){ throw new Error(`Tous les champs de la section personne contact doivent être complétés`); }
          })

        } catch(e){
          console.error(e);
          return; //Stop the process
        }

        /*
        * 
        *     Submitting step one => audio files
        * 
        * 
        */

       try{
            //1. one by one : 
            //                - try to upload file
            //                - keep trace of the url in the storage
            //                - save it into the mainForm dedicated places

            const storageRef = storage.ref(); 

            //Map through the audio spaces
            await Promise.all(
              Object.keys(audioFormData).map( async key => {

                const file = audioFormData[key];

                if(file){

                  //The audio file isn't empty so, we need to push it
                  const fileRef = storageRef.child(file.name);
                  await fileRef.put(file);

                  //If it worked, get the Url
                  const fileUrl = await fileRef.getDownloadURL();

                  //Add it to the mainFormData in the proper place
                  mainFormData.audioFiles = { 
                    ...mainFormData.audioFiles, 
                      [key]: fileUrl
                  }

                }

              })
            )
              
            //Once work with the files is done, if there was no error, call the next function
            submittingStepTwo();

          } catch(e){
            console.error(e);
            alert("Un problème est survenu lors du téléversement des fichiers. \n\n Assurez-vous que ceux-ci ne soient pas trop lourds et soient de format audio.")
            return; //Stop the process
          }



    }

    return (
      <div className={`${styles.choraleFormPage} maxWidthPageContainer`}>
          <h1>Participer à la chorale de la fin</h1>
          <form onSubmit={onSubmit} className="col-12">

                {/* Section with all the personnal informations */}
                <FormContainer 
                    title="Personne contact"
                    subTitle="Ces informations resteront confidentielles" 
                >
                    {/* Import the contact form component. This one must receive the state constant as props */}
                    <ContactForm data={userForm} setData={setUserForm} />
                </FormContainer>

                {/* Section with all the credits informations */}
                <FormContainer 
                    title="Crédits du projet"
                    subTitle="Les informations suivantes apparaîtront dans l'application" 
                >
                    {/* Import the choral form component. This one must receive the state constant as props */}
                    <ChoralForm data={mainForm} setData={setMainForm} />
                </FormContainer>

                {/* Section with the input for the choral */}
                <FormContainer 
                    title="Intégrer votre enregistrement du chant final"
                    subTitle="Informations supplémentaire à définir..." 
                >
                    {/* Import the choral form component. This one must receive the state constant as props */}
                    <ChoralAudioForm data={audioForm} setData={setAudioForm} />
                </FormContainer>

                <button>Soumettre</button>

          </form>

      </div>
    );

}
  
  
export default ChoraleFormPage;
  