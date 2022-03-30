/*

    Db queries for the scenes animation

*/

import { firestore } from '../../../../../firebase'


/* 
    Basic shuffle function
*/
const shuffle = array => {
    return array.sort((a, b) => 0.5 - Math.random());
}


//Get The audio files and there informations for the scenes
export const getAllAudioScene = async ( storedData, setStoredData ) => {

    try {

        if(storedData){

            return storedData
            
        } else {

            const collection = firestore.collection( "credit" );

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
    Function to return a map of all the data needed per scene
*/
export const getRandomScenesMap = ( data ) => {

    const array = []

    //fill the array to shuffle it later
    for(let i = 0; i < data.length; i++){
        array.push(i);
    }

    //console.log(shuffle(array))

    const map = {
        audio1: null,
        audio2: null,
        audio3: null, 
        audio4: null,
        audio5: null
    }

    //Loop through the object properties to evaluate them one by one
    Object.keys(map).forEach(key => {

        const newOrder = shuffle(array);

        for(let i = 0; i < data.length; i++) {
            const elem = data[ newOrder[i] ];     //With the shuffled index

            //Make sure that the element exist to avoid an error
            if(elem.audioFiles[key] && elem.audioFiles){
                //Look for the three conditions
                if(elem.audioFiles[key].address && elem.audioFiles[key].displayRandom){
                    //It respected the conditions so store the data and stop the loop
                    map[key] = elem;
                    i = data.length;   //Loop wont meet the condition next turn
                }
            }
        }
    })

    return map

}

/* 

    Get random file for a specefic scene

*/

export const randomlyFetchSpecificScene = async ( scene,  storedData, setStoredData ) => {

    try {

        let valueToReturn = null

        if(storedData){

            console.log(storedData)
            const shuffledArray = shuffle(storedData);
            
            for(let i = 0; i < shuffledArray.length; i++){
                if(shuffledArray[i].audioFiles[scene]){
                    valueToReturn = shuffledArray[i]
                    i = shuffledArray.length   //stop the loop
                }
            }

        } else {

            const collection = firestore.collection( "credit" );

            //Retrieve all the elements
            const snapShot = await collection.where("status", "==", "accepted").get()

            const entries = [];

            //Fill the new array
            snapShot.forEach(doc => entries.push( doc.data() ) )

            //store the data in the SceneControl component state to prevent fetching for nothing
            setStoredData(entries)

            const shuffledArray = shuffle(entries);
            
            for(let i = 0; i < shuffledArray.length; i++){
                if(shuffledArray[i].audioFiles[scene]){
                    valueToReturn = shuffledArray[i]
                    i = shuffledArray.length   //stop the loop
                }
            }
        }

        return valueToReturn
        

    } catch (error){
        console.log(error)
    }

}

/*
    Function to return all the accepted scenes
*/

export const fetchAllAcceptedScenes = async () => {

    try {

            const collection = firestore.collection( "credit" );

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

    } catch(err){
        console.log(err)
    }
    
}



/*
    Function to return all the accepted scenes when a specific audio field is filled


export const fetchScenesForAudioField = async ( audioField ) => {

    try {

            const collection = firestore.collection( "credit" );

            //Retrieve all the elements
            const snapShot = await collection.where(`audioFiles.${audioField}`, "!=", "null").get()

            const entries = [];

            //Fill the new array
            snapShot.forEach(doc => {
                const data = doc.data()
                const dataWithId = {...data, id: doc.id}
                entries.push( dataWithId ) 
            })

            return entries

    } catch(err){
        console.log(err)
    }
    
}
*/