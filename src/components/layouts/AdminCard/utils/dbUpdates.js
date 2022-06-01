import firebase, { firestore, storage } from '../../../../firebase'

/*
          subject: 'Acceptation de la bande sonore',
            email: email,
            content: `<p>Bonjour ${firstName},</p>
                        <p>Bonne nouvelle : ta bande sonore pour le conte « Maélie et le dragon » a été approuvée !
                        Tu peux maintenant aller l’écouter dans le module interactif <strong><a href="https://maelie-et-le-dragon.web.app">ici</a></strong>.</p>
                        <p>Le menu te permettra de trouver ta bande sonore ou celle de tes amis. Tu peux aussi écouter d’autres bandes sonores au hasard avec le mode aléatoire.</p>
                        <p>Si tu as des questions, écris-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                        <p>L’équipe de la SMCQ Jeunesse</p>`
*/
const sendConfirmationEmail = (action, collection, firstName, email, isIndependentChoir) => {

    if(collection === "credit" && action === "accepted"){
        /*
            First option : send a message of acceptation for participation in the scenes
        */
       try{
            const sendEmail = firebase.functions().httpsCallable('sendEmail');
            sendEmail({
            subject: 'Acceptation de la bande sonore',
            email: email,
            content: `<p>Bonjour ${firstName},</p>
                        <p>Bonne nouvelle : ta bande sonore pour le conte « Maélie et le dragon » a été approuvée !
                        Tu pourras bientôt aller l’écouter dans le module interactif <strong><a href="https://maelie-et-le-dragon.web.app">ici</a></strong>.</p>
                        <p>Le menu à droite te permettra trouver ta bande sonore ou celle de tes amis. Tu pourras aussi écouter d’autres bandes sonores au hasard avec le mode aléatoire.</p>
                        <p>Si tu as des questions, écris-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                        <p>L’équipe de la SMCQ Jeunesse</p>`

            }).then(result => {
                console.log(result.data);
                alert("Courriel envoyé avec succès.")
            })

       } catch (err) {
           alert("Un problème est survenue lors de l'envoie du courriel de confirmation. Cependant, la modification a bien fonctionné.")
       }


    } else {

        if(collection === "credit" && action === "refused"){
            /*
                Second option : send a message to informe the user that its form has been refused 
            */
           try{
                const sendEmail = firebase.functions().httpsCallable('sendEmail');
                sendEmail({
                subject: 'Fichier non approuvé',
                email: email,
                content: `<p>Bonjour ${firstName},</p>
                            <p>Malheureusement, ta contribution au conte sonorisé « Maélie et le dragon » n’a pas pu être acceptée pour l’une des raisons suivantes :</p>
                            <ul>
                                <li>le fichier envoyé est illisible</li>
                                <li>la bande sonore n’a pas de lien ou trop peu de lien avec l’histoire</li>
                            </ul>
                            <p>N’hésite pas à recommencer le processus en envoyant un fichier dans le bon format (mp3 de 5 à 90 secondes) en lien avec la scène du conte que tu as choisie.</p>
                            <p>Si tu as des questions, écris-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                            <p>L’équipe de la SMCQ Jeunesse</p>`
    
                }).then(result => {
                    console.log(result.data);
                    alert("Courriel envoyé avec succès.")
                })
    
           } catch (err) {
               alert("Un problème est survenue lors de l'envoie du courriel de confirmation. Cependant, la modification a bien fonctionné.")
           }
    
    
        } else {

            if(collection === "choral" && action === "accepted"){
                /*
                    third option : send a message to informe the user that its participation to the choral has been accepted
                */

                //If the audio file is for the independant choir, then send a form a bit different
                if(isIndependentChoir){

                    try{
                        const sendEmail = firebase.functions().httpsCallable('sendEmail');
                        sendEmail({
                        subject: 'Acceptation de fichier pour la chanson de Maélie',
                        email: email,
                        content: `<p>Bonjour ${firstName},</p>
                                    <p>Bonne nouvelle : votre enregistrement de la « Chanson de Maélie » a été approuvée !
                                    Un courriel vous sera envoyé lorsque la chorale virtuelle sera disponible dans le module interactif <strong><a href="https://maelie-et-le-dragon.web.app">ici</a></strong>.</p>
                                    <p>Si vous avez des questions, écrivez-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                                    <p>L’équipe de la SMCQ Jeunesse</p>`
            
                        }).then(result => {
                            console.log(result.data);
                            alert("Courriel envoyé avec succès.")
                        })
            
                    } catch (err) {
                        alert("Un problème est survenue lors de l'envoie du courriel de confirmation. Cependant, la modification a bien fonctionné.")
                    }

                } else {

                    try{
                        const sendEmail = firebase.functions().httpsCallable('sendEmail');
                        sendEmail({
                        subject: 'Acceptation de fichier pour la chanson de Maélie',
                        email: email,
                        content: `<p>Bonjour ${firstName},</p>
                                    <p>Bonne nouvelle : ta contribution au « Chant de Maélie » a été approuvée !
                                    Un courriel sera envoyé à tous les participants lorsque la chorale virtuelle sera disponible dans le module interactif <strong><a href="https://maelie-et-le-dragon.web.app">ici</a></strong>.</p>
                                    <p>Si tu as des questions, écris-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                                    <p>L’équipe de la SMCQ Jeunesse</p>`
            
                        }).then(result => {
                            console.log(result.data);
                            alert("Courriel envoyé avec succès.")
                        })
            
                    } catch (err) {
                        alert("Un problème est survenue lors de l'envoie du courriel de confirmation. Cependant, la modification a bien fonctionné.")
                    }

                }

               
        
        
            } else {


                if(collection === "choral" && action === "refused"){
                    /*
                        fourth option : send a message to informe the user that its participation to the chorale has been refused
                    */
                   try{
                        const sendEmail = firebase.functions().httpsCallable('sendEmail');
                        sendEmail({
                        subject: 'Fichier non approuvé',
                        email: email,
                        content: `<p>Bonjour ${firstName},</p>
                                    <p>Malheureusement, ta contribution à la « Chanson de Maélie » n’a pas pu être acceptée pour l’une des raisons suivantes :</p>
                                    <ul>
                                        <li>le fichier envoyé est illisible ou contient trop de sons parasites</li>
                                        <li>l’enregistrement ne correspond pas à l’une des deux parties de la chanson</li>
                                        <li>les deux parties de la chanson ont été enregistrées ensemble</li>
                                        <li>c’est la bonne chanson, mais elle n’a pas été enregistrée au même tempo que la piste de référence.</li>
                                    </ul>
                                    <p>N’hésite pas à recommencer le processus en envoyant un fichier dans le bon format (mp3) enregistré en synchronicité avec la piste de référence du <a href="https://smcqeducation.ca/?artist=lodyssee-contemporaine">karaoké</a>.</p>
                                    <p>Si tu as des questions, écris-nous à <a href="mailto:maelieetledragon@smcq.qc.ca" target="_blank">maelieetledragon@smcq.qc.ca</a> .</p>
                                    <p>L’équipe de la SMCQ Jeunesse</p>`
            
                        }).then(result => {
                            console.log(result.data);
                            alert("Courriel envoyé avec succès.")
                        })
            
                   } catch (err) {
                       alert("Un problème est survenue lors de l'envoie du courriel de confirmation. Cependant, la modification a bien fonctionné.")
                   }
                }
            }
        }
    }
}
/*
    Function to accept or refuse a specific form
*/
export const validateForm = async ( id, collectionName, action, firstName = null, email = null,  independentChoir = false) => {

    try {

        //Prevent an error that would hide some forms
        if(action === "accepted" || action === "refused" || action === ""){
            await firestore.collection( collectionName ).doc( id ).update("status", action)
            alert("Félicitations. Les changements ont bien été effectués. Vous n'avez qu'à recharger la page pour voir les modifications.")

            sendConfirmationEmail(action, collectionName, firstName, email, independentChoir)
        } else {
            throw new Error("Mauvaise valeur d'acceptation entrée"); 
        }
        
    } catch(error) {
        console.log(error)
    }
    
}

/*
    Update a specific field in the form 
*/
export const updateInformationUnit = async ( id, collectionName, field, value ) => {

    try {

        await firestore.collection( collectionName ).doc( id ).update( field , value )
        alert("Félicitations. Les changements ont bien été effectués.")
    
    } catch(error) {
        alert(error)
    }
    
}

/*
    Delete a whole card from database 
*/
export const deleteSingleCard = async (formId, formCollection, contactId, storageRefs) => {

    console.log("Deletion function called")

    const confirmationValues = [
        'Une erreur est survenue',
        'Procédé interrompu',
        'Document supprimé avec succès !'
    ]
    /*
        Default status of the three card composants
        Change the values while progressing through it
    */
    let formDeletionConfirmation = confirmationValues[0];
    let storageDeletionConfirmation = confirmationValues[1];
    let contactDeletionConfirmation = confirmationValues[1];


    try {

        /*
            Step one : Delete main form collection
        */
        await firestore.collection( formCollection ).doc( formId ).delete()
        
        //At this point, the collection deletion worked so we can change the elements status
        formDeletionConfirmation = confirmationValues[2]; //succes
        storageDeletionConfirmation = confirmationValues[0]; //If the next operation doesn't work, then this will be the right message. Otherwise, it is going to be changed

        /*
            Step two : Delete all the files in the storage
        */
        for(let property in storageRefs){
            if(storageRefs[property]){
                console.log(storageRefs[property].address)
                //get the url of the ref and delete the element
                await storage.refFromURL(storageRefs[property].address).delete();

            }
        }

        storageDeletionConfirmation = confirmationValues[2]; //Update the status
        contactDeletionConfirmation = confirmationValues[0]; //set it to failed in case this doesn't work. Otherwise, it will be updated

        /*
            Step three : Delete the contact form
        */

       await firestore.collection( "contact" ).doc( contactId ).delete()

       contactDeletionConfirmation = confirmationValues[2]; //Update the status

       alert(
           "Status de suppression : \n" +
           "Formulaire principale : " + formDeletionConfirmation + "\n" +
           "Fichiers audio : " + storageDeletionConfirmation + "\n" +
           "Informations de contact : " + contactDeletionConfirmation + "\n\n" +
           "Veuillez rafraichir la page pour voir les changements."
       )



    
    } catch(error) {
        console.log(error)

        alert(
            "Status de suppression : \n" +
            "Formulaire principale : " + formDeletionConfirmation + "\n" +
            "Fichiers audio : " + storageDeletionConfirmation + "\n" +
            "Informations de contact : " + contactDeletionConfirmation
        )
    }
    
}

