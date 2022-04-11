import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';

import { firestore, storage } from '../../../firebase';

import Message from '../../../components/layouts/message/Message'

import Button from '../../../components/Button/Button'

import FormContainer from '../../../components/forms/container/FormContainer';
import ContactForm from '../../../components/forms/form/contactForm/ContactForm';
import ChoralForm from '../../../components/forms/form/ChoralForm/ChoralForm';
import ChoralAudioForm from '../../../components/forms/form/ChoralAudioForm/ChoralAudioForm';

import styles from './ChoraleFormPage.module.scss';
import Hill from '../../../images/illustrations/colline1.png'
import castle from '../../../images/illustrations/chateau.png'

const ChoraleFormPage = () => {

  const [formSent, setFormSent] = useState(false);

  const [message, setMessage] = useState({
    message: "",
    positive: false
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    createdAt: firebase.firestore.Timestamp.now(),
    audioFiles: {
      choraleVirtuelle1: null,
      choraleVirtuelle2: null,
      choraleIndependante: null
    }
  })

  const [audioForm, setAudioForm] = useState({
    choraleVirtuelle1: null,
    choraleVirtuelle2: null,
    choraleIndependante: null
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
              setMessage({
                message: "Un problème est survenu. Assurez-vous que les données de contact que vous avez fournies sont du bon format.",
                positive: false
              })
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
              
              setMessage({
                message: "Félicitations. Les informations ont bien été enregistrées",
                positive: true
              })
              //Change form state
              setFormSent(true);

              //Sending the confirmation email
              try {

                const sendEmail = firebase.functions().httpsCallable('sendEmail');
                  sendEmail({
                    subject: 'Confirmation de réception de la chorale virtuelle !',
                    email: userFormData.email,
                    content: `<p>Bonjour ${userFormData.firstname},</p>
                              <p>Merci pour ta contribution au chant final du conte « Maélie et le dragon » !</p>
                              <p>Nous vérifions maintenant que tout est conforme et s’il y a un problème, nous te contacterons. Un message te sera envoyé lorsque tu pourras entendre le chœur virtuel dans le module interactif.</p>
                              <p>N’hésite pas à inviter tes ami.e.s à participer à l’aventure !</p>
                              <p>Si tu as des questions, écris-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                              <p>Maélie et l’équipe de feu<br/>
                              SMCQ Jeunesse</p>`

                  })
                  
                  /*.then(result => {
                    console.log(result.data)
                  })*/

              } catch (err){
                console.log("Une erreur est survenue avec l'envoie du courriel.")
                console.log(err)
              }




            } catch(e){
              setMessage({
                message: "Un problème est survenu. N'hésitez pas à nous contacter pour nous faire part du problème.",
                positive: false
              })
              return; //Stop the process
            }
      }


      /*
        * 
        *     Validation step one => validation of the audio files
        * 
        *    
        */

       if(!audioFormData.choraleVirtuelle1 && !audioFormData.choraleVirtuelle2 && !audioFormData.choraleIndependante){
          setMessage({
            message: "Vous devez inclure un fichier audio avec ce formulaire",
            positive: false
          })
      
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
          setMessage({
            message: "Tous les champs de la section contact doivent être complétés",
            positive: false
          })
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
                  const fileRef = storageRef.child((Math.floor(1000 + Math.random() * 9000)) + file.name);
                  await fileRef.put(file);

                  //If it worked, get the Url
                  const fileUrl = await fileRef.getDownloadURL();

                  //Add it to the mainFormData in the proper place
                  mainFormData.audioFiles = { 
                    ...mainFormData.audioFiles, 
                      [key]: {
                        address: fileUrl,
                        displayRandom: true
                      }
                  }
                }
              })
            )
              
            //Once work with the files is done, if there was no error, call the next function
            submittingStepTwo();

          } catch(e){
            setMessage({
              message: "Un problème est survenu lors du téléversement des fichiers. \n\n Assurez-vous que ceux-ci ne soient pas trop lourds et soient de format audio.",
              positive: false
            })

            return; //Stop the process
          }



    }

    return (

      <section className={`${styles.choraleFormPage}`}>
        <div className={`maxWidthPageContainer`}>
          {
            !formSent &&
            <header>
              <h1 className="red">Envoie-nous ton ou tes enregistrement(s) audio pour participer au chant final de la "Chanson de Maélie"</h1>
          {/*     <h4 className="blue">Il est important de t'enregistrer en suivant le <span style={{cursor: "pointer"}} className="pink" onClick={event =>  window.location.href='https://smcqeducation.ca/?s=karaoke'} >karaoké</span> avec un écouteur dans une oreille. Cela te permettra d'être synchronisé avec les autres choristes grâce à la piste audio de référence. Attention ! Assure-toi qu'on entende seulement ta voix dans l'enregistrement, et pas le karaoké.</h4>*/}
              <h4 className="blue">Deux options sont possibles :</h4>
              <ul>
                <li>
                  <h5>1. Participer à la chorale virtuelle </h5>
                  <p>Dans ce cas, ton enregistrement sera combiné avec l'enregistrement de plusieurs autres enfants pour faire une grande chorale virtuelle. Il est important de t'enregistrer en suivant le karaoké avec un écouteur dans une oreille. Cela te permettra d'être synchronisé avec les autres choristes grâce à la piste audio de référence. Attention ! Assure-toi qu'on entende seulement ta voix dans l'enregistrement, et pas le karaoké. </p>
                  <p>Date limite pour participer : 15 mai 2022 </p>
                  <p>Mise en ligne de la chorale virtuelle dans le module interactif : 8 juin 2022</p>
                </li>
                <li>
                  <h5>2. Soumettre l'enregistrement d'une chorale indépendante</h5>
                  <p>Les chefs de chœur peuvent enregistrer leur chorale au complet interprétant "la Chanson de Maélie". Cela peut se faire à une ou deux voix, avec ou sans piano, au tempo de votre choix. N'hésitez pas à ajouter une touche personnelle (forme flexible, rubato ou rallentando, nuances, ajout de percussions ou d'autres instruments etc.).</p>
                  <p>Soumissions en tout temps. Ajout direct au module interactif après approbation.</p>
                </li>
              </ul>
            </header>
             }
            { message.message && 
                <Message>{ message.message }</Message>
            }

            { message.message && message.positive &&
                <Message positiveReview>{ message.message }</Message>
            }

            <form onSubmit={onSubmit} className="col-12">
                { !formSent &&
                <>
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
                      title="Extraits audio"
                      subTitle="" 
                  >
                      {/* Import the choral form component. This one must receive the state constant as props */}
                      <ChoralAudioForm data={audioForm} setData={setAudioForm} />
                  </FormContainer>

                  <Button>Envoyer</Button>
                  </>

                }

                { formSent &&

                  <FormContainer 
                      title="Félicitations !"
                      subTitle='Ton formulaire a bien été envoyé. Merci pour ta participation à la "Chanson de Maélie" !' 
                  >
                      
                  </FormContainer>

                }

            </form>
          
      

        </div>
        <div className={styles.formPageBackground}>
          <div className={styles.skyBackgroundGradient}>
            <div></div>
            <div></div>
          </div>

          <div className={styles.hillIllustrationContainer}>
            <img alt="Illustration de coline" src={Hill}/>

          </div>

          <div className={styles.castleIllustrationContainer}>
            <img src={ castle } alt="Illustration de chateau" />
          </div>

        </div>
      </section>
    );

}
  
  
export default ChoraleFormPage;
  