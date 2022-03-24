//Database reference
import { firestore } from '../../../../firebase'




export const getContactById = async ( id ) => {

    try{
        const collection = firestore.collection("contact");

        //Retrieve a single element
        const snapShot = await collection.doc(id).get()

        if(snapShot.exists) {
            return snapShot.data()
        } else {
            throw new Error("Une erreur est survenue");
        }

    } catch (e) {
        console.log(e);
        return "Une erreur est survenue"
    }

}

/*
        Fetch scene form results contained in an array
*/
export const getSceneFormData = async () => {

    try{
        const collection = firestore.collection("credit").where("artistName", "!=", "undefined" );

        //Retrieve a single element
        const snapShot = await collection.get()

        const entries = [];

        snapShot.forEach((doc) => {
            const data = doc.data();
            const dataWithId = {...data, id: doc.id}
            entries.push(dataWithId);
        })

        return entries
    

    } catch (e) {
        console.log(e);
        return "Une erreur est survenue"
    }

}

/*
        Fetch Maelie's song form results contained in an array
*/
export const getMaelieSongFormData = async () => {

    try{
        //the search for none undefined chorist name is only to avoid getting the default result
        const collection = firestore.collection("choral").where("choristNames", "!=", "undefined" );

        //Retrieve all the elements
        const snapShot = await collection.get()

        const entries = [];

        snapShot.forEach((doc) => {
           const data = doc.data();
           const dataWithId = {...data, id: doc.id}
           entries.push(dataWithId);
           
        })

        return entries
    

    } catch (e) {
        console.log(e);
        return "Une erreur est survenue"
    }

}