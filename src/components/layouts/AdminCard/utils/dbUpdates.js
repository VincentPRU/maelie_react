import { firestore } from '../../../../firebase'

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
        console.log(error)
    }
    
}

