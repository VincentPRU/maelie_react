import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';

import { firestore, storage } from '../../../firebase';
import FormContainer from '../../../components/forms/container/FormContainer';
import ContactForm from '../../../components/forms/form/contactForm/ContactForm';
import CreditForm from '../../../components/forms/form/creditForm/CreditForm';
import AudioScenesForm from '../../../components/forms/form/ScencesForm/AudioScenesForm';
import Spinner from '../../../utils/Spinner/Spinner'

import Button from '../../../components/Button/Button'

import styles from './SceneForm.module.scss'

import Message from '../../../components/layouts/message/Message'

import Hill from '../../../images/illustrations/colline1.png'
import tree from '../../../images/illustrations/arbre.png'

const SceneForm = () => {

    const [formSent, setFormSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
      message: "",
      positive: false
    })

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [loading])

    const [userForm, setUserForm] = useState({
      occupation: '',
      name: '',
      firstname: '',
      email: ''
    })

    const [mainForm, setMainForm] = useState({
      artistName: '',
      participantsName: '',
      school: '',
      age: null,
      city: '',
      country: '',
      contactRef: null,
      quality: true,
      createdAt: firebase.firestore.Timestamp.now(),
      audioFiles: {
        audio1: null,
        audio2: null,
        audio3: null,
        audio4: null,
        audio5: null
      }
    })

    const [audioForm, setAudioForm] = useState({
      audio1: null,
      audio2: null,
      audio3: null,
      audio4: null,
      audio5: null
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
                setLoading(false)
                setMessage({
                  message: "Un probl??me est survenu. Assurez-vous que les donn??es de contact que vous avez fournies sont du bon format.",
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
              await firestore.collection("credit").add(mainFormData)

              setLoading(false)

              setMessage({
                message: "F??licitations. Les informations ont bien ??t?? enregistr??es",
                positive: true
              })

              //Change form state
              setFormSent(true);

              //Envoie du courriel
              try {

                const sendEmail = firebase.functions().httpsCallable('sendEmail');
                  sendEmail({
                    subject: 'Confirmation de r??ception de la bande sonore !',
                    email: userFormData.email,
                    content: `<p>Bonjour ${userFormData.firstname},</p>
                              <p>Merci pour ta contribution au conte musical ????Ma??lie et le dragon???? !</p>
                              <p>Nous v??rifions maintenant que tout est conforme. Un message te sera envoy?? d??s que tu
                              pourras entendre ta bande sonore dans le module interactif.</p>
                              <p>N???h??site pas ?? inviter tes ami.e.s ?? participer ?? l???aventure !</p>
                              <p>Si tu as des questions, ??cris-nous ?? <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                              <p>Ma??lie et l?????quipe de feu<br/>
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

              setLoading(false)

              setMessage({
                message: "Un probl??me est survenu. N'h??sitez pas ?? nous contacter pour nous faire part du probl??me.",
                positive: false
              })
              return; //Stop the process
            }

        }


        /*
        * 
        *
        *     Validation step one => validation of the audio files
        * 
        * 
        */

       try{
            //Evaluate every audio space in memory to make sure that there is at least one audio file to import
            let audioFileIncluded = false;    //false by default
  
            Object.keys(audioFormData).forEach(key => {
              if(audioFormData[key]){ audioFileIncluded = true } //then set the variable to true and let the process continue.
            })
  
            if(!audioFileIncluded){ throw new Error(`Il doit y avoir au moins un fichier audio int??gr?? au formulaire.`); }
  
          } catch (e){

              setMessage({
                message: "Au moins un fichier audio est requis pour soumettre le formulaire",
                positive: false
              })
              return  //Stop the process
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
            if(!userFormData[key]){ throw new Error(`Tous les champs de la section personne contact doivent ??tre compl??t??s`); }
          })

        } catch(e){
          setMessage({
            message: "Tous les champs de la section contact doivent ??tre compl??t??s",
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

          setLoading(true)
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
            setLoading(false)
            setMessage({
              message: "Un probl??me est survenu lors du t??l??versement des fichiers. \n\n Assurez-vous que ceux-ci ne soient pas trop lourds (max. 5 Mo) et soient de format audio.",
              positive: false
            })
          return; //Stop the process
        }

        
       


    }


    return (
        <section className={`${styles.pageStyling}`}>
          <div className={`maxWidthPageContainer`}>

            {
              !formSent && !loading &&
              <header>
                <h2 className={`col-12 ${styles["grey-page-title"]}`}>[ Participer aux sc??nes ]</h2>
                <h1 className="col-12 red">Envoie-nous ton ou tes enregistrement(s) audio pour participer ?? la bande sonore du conte.</h1>
                <h4 className="col-12 blue">Rappel : Les enregistrements doivent durer entre 5 et 90 secondes chacun.</h4>
              </header>
            }

            { message.message && 
                <Message>{ message.message }</Message>
            }

            { message.message && message.positive &&
                <Message positiveReview>{ message.message }</Message>
            }
            { !formSent && !loading &&
            <form onSubmit={onSubmit} className="col-12">

                {/* Section with all the personnal informations */}
                <FormContainer 
                    title="Personne contact"
                    subTitle="Ces informations resteront confidentielles" 
                >
                    {/* Import the contact form component. This one must receive the state constant as props */}
                    <ContactForm data={userForm} setData={setUserForm} />
                </FormContainer>

                {/* Section with credits */}
                <FormContainer 
                    title="Cr??dits"
                    subTitle="Les informations suivantes appara??tront dans l'application" 
                >

                  <CreditForm data={mainForm} setData={setMainForm} />

                </FormContainer>

                {/* Section with audio files */}
                <FormContainer 
                    title="Extraits audio"
                    subTitle="Assure-toi de mettre le bon fichier audio avec la sc??ne correspondante." 
                >

                  <AudioScenesForm data={audioForm} setData={setAudioForm} />
                  </FormContainer>

                <Button>Envoyer</Button>
            </form>
            }
            { formSent && !loading &&
            <div className={styles.confirmationMessage}>
                <FormContainer 
                        title="F??licitations !"
                        subTitle={`Ton formulaire a bien ??t?? soumis. Merci d'avoir particip?? ?? la bande sonore de "Ma??lie et le dragon".`}
                    >

                  </FormContainer>
            </div>
            } 
            { loading &&
              <div className={`${styles["spinner-container"]}`}>
                  <Spinner />
              </div>
            }
            </div>

            <div className={styles.formPageBackground}>

              <div className={styles.skyBackgroundGradient}>
                <div></div>
                <div></div>
              </div>

              <div className={styles.hillIllustrationContainer}>
                <img alt="Illustration de coline" src={Hill}/>
              </div>

              <div className={styles.treeIllustrationContainer}>
                <img src={ tree } alt="Illustration de chateau" />
                <img src={ tree } alt="Illustration de chateau" />
              </div>
          
        </div>

        </section>
    );
}


export default SceneForm;