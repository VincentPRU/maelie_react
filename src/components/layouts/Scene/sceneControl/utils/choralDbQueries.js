/*

    Db queries for the choral animation

*/

import { firestore } from '../../../../../firebase'

/* 
    Basic shuffle function
*/
const shuffle = array => {
    return array.sort((a, b) => 0.5 - Math.random());
}


//Get The audio files and there informations for the scenes
export const getAllAudioChoral = async ( storedData, setStoredData ) => {
    
    try {

        if(storedData){

            return storedData
            
        } else {

            const collection = firestore.collection( "choral" );

            //Retrieve all the elements
            const snapShot = await collection.where("status", "==", "accepted").get()

            const entries = [];

            //Fill the new array
            snapShot.forEach(doc => entries.push( doc.data() ) )

            //store the data in the SceneControl component state to prevent fetching for nothing
            setStoredData(entries)

            return entries

        }

        

    } catch (error){
        console.log(error)
    }

} 


/*
    get a single random choral elem
*/
export const getRandomSingleChoralElem = ( data ) => {

    const array = []

    //fill the array to shuffle it later
    for(let i = 0; i < data.length; i++){
        array.push(i);
    }

    //console.log(shuffle(array))

    let choralAudio = null

    const newOrder = shuffle(array);

    for(let i = 0; i < data.length; i++) {
        const elem = data[ newOrder[i] ];     //With the shuffled index

        //Make sure that the element exist to avoid an error
        if(elem.audioFiles.choraleIndependante){
            //Look for the three conditions
            if(elem.audioFiles.choraleIndependante.address && elem.audioFiles.choraleIndependante.displayRandom){
                //It respected the conditions so store the data and stop the loop
                choralAudio = elem;
                i = data.length;   //Loop wont meet the condition next turn
            }
        }
    }
    

    return choralAudio

}

/*
    get all chorale elements 
*/

export const getAllChoralGeneral = async () => {

    try {

        const collection = firestore.collection( "choral" );

        //Retrieve all the elements
        const snapShot = await collection.where("status", "==", "accepted").get()

        const entries = [];

        //Fill the new array
        snapShot.forEach(doc => {
            const data = doc.data()
            const dataWithId = {...data, id: doc.id}
            entries.push( dataWithId ) 
        })

        return entries

    } catch (error){
        console.log(error)
    }
    

}
