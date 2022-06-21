//Import database reference 
import { firestore, storage } from '../../../../../firebase'
import { getDownloadURL } from 'firebase/storage';


export const changeRandomMode = async (collection, id, fieldName, value) => {
    try {
        await firestore.collection( collection ).doc( id ).update( `audioFiles.${fieldName}.displayRandom` , value)
    } catch(error) {
        alert("Opération échouée. Une erreur est survenue");
    }
}

export const changeAudioReference = async (e, collection, id, fieldName, newUrl, conservePrevious, previousUrl, randomMode, uploadFileBefore) => {

    e.preventDefault();

    let finalStatus = "Opération échouée. Une erreur est survenue."

    //If the random mode is not defined to a bool, then make it automatically at true
    //This is especially for the case where it is a new audio without a randomMode defined
    const randomStatus = 'boolean' === (typeof randomMode) ? randomMode : true;

    try {


        //Make sure that the link is working before changing anything
        const ref = storage.refFromURL(newUrl)
        finalStatus = uploadFileBefore ? "Opération échouée. Le nouveau fichier a bien été téléversé mais, il n'a pu être lié à ce formulaire" : "Opération échouée. Assurez-vous d'avoir un lien valide"
        await getDownloadURL(ref)
    


        //First of all, update the url in the data base
        await firestore.collection( collection ).doc( id ).update( `audioFiles.${fieldName}` , {
            address: newUrl,
            displayRandom: randomStatus
        })

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


//Function to upload a new audio file
export const uploadNewAudioFile = async (e, audioFile, collection, id, fieldName, conservePrevious, previousUrl, randomMode) => {

    e.preventDefault();

    let newUrl = undefined;

    try {

        //Step one : upload the file into the storage
        const storageRef = storage.ref(); 
        const fileRef = storageRef.child((Math.floor(1000 + Math.random() * 9000)) + audioFile.name);
        await fileRef.put(audioFile);

        //If it worked, get the Url
        newUrl = await fileRef.getDownloadURL();

    } catch (error) {
        console.log(error)
        alert("Un problème est survenu lors du téléversement du fichier")
        return
    }

    //If it worked, then call the other function to replace the old url with the new one
    changeAudioReference(e, collection, id, fieldName, newUrl, conservePrevious, previousUrl, randomMode, true)

}

export const liberateSpace = async (e, collection, id, field, conservePrevious, previousUrl) => {

    console.log("here")
    e.preventDefault();

    let status = "Opération échouée. Une erreur s'est produite."
    const prevUrl = previousUrl ? previousUrl : null;

    try{

        //First step : update the field to insert a null value
        await firestore.collection( collection ).doc( id ).update( `audioFiles.${field}` , null)

        //update the status
        status = "Opération réussie ! L'espace mémoire a bien été libéré."

        //If the user wants to delete the audio file inside
        if(!conservePrevious){

            //Update status to prevent error
            status = "Une erreur est survenue. L'espace mémoire a bien été libéré mais, le fichier audio n'a pu être supprimé et existe toujours dans le stockage"

            if(prevUrl){
                //Delete the element
                await storage.refFromURL(prevUrl).delete();
                //Communicate if it worked
                status = "Opération réussie ! L'espace mémoire a bien été libéré, et le fichier audio est maintenant supprimé."

            }
        }

        alert(status)

    } catch(error){
        console.log(error);
        alert(status)
    }


}