import { firestore, storage } from '../../../../firebase'

/*
    Function to accept or refuse a specific form
*/
export const validateForm = async ( id, collectionName, action ) => {

    try {

        //Prevent an error that would hide some forms
        if(action === "accepted" || action === "refused" || action === ""){
            await firestore.collection( collectionName ).doc( id ).update("status", action)
    
            alert("Félicitations. Les changements ont bien été effectués. Vous n'avez qu'à recharger la page pour voir les modifications.")
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

