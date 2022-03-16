//Import database reference 
import { firestore, storage } from '../../../../../firebase'
import { getDownloadURL } from 'firebase/storage';

export const changeAudioReference = async (e, collection, id, fieldName, newUrl, conservePrevious, previousUrl) => {

    e.preventDefault();

    let finalStatus = "Opération échouée. Une erreur est survenue."

    try {


        //Make sure that the link is working before changing anything
        const ref = storage.refFromURL(newUrl)
        finalStatus = "Opération échouée. Assurez-vous d'avoir un lien valide"
        await getDownloadURL(ref)
    


        //First of all, update the url in the data base
        await firestore.collection( collection ).doc( id ).update( `audioFiles.${fieldName}.address` , newUrl)

        //update confirmation message 
        finalStatus = "La modification a été effectuée avec succès"

        //if we dont want to conserve the previous file in memory
        if(!conservePrevious && previousUrl){

            //Start with error message
            finalStatus = "La modification a été effectuée avec succès. \nCependant, l'ancien fichier n'a pu être supprimé."

            await storage.refFromURL(previousUrl).delete();

            //Start with error message
            finalStatus = "La modification a été effectuée avec succès. \nDe plus, l'ancien fichier a bien été supprimé."

        }
        alert(finalStatus)

    } catch (error){
        console.log(error)
        alert(finalStatus);
    }
}

