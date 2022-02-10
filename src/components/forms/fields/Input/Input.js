import React, {useEffect, useState} from 'react';

import { firestore } from '../../../../firebase';

import styles from './Input.module.scss';

/*
*
*    Data : Data of all the state object
*    setData : Edit the state object
*    name : name of the property to refer in the state object. Super important !
*    isRequired : Bool that is going to tel the browser if the feild is required to be filed
*    prefilled : String that receive a value to display into the feild. Empty if nothing to show
*    fetchingInfos: receive the name of a firestore collection. If filled, it fetch the data and use it
*    Children : text to display in the label
*
*/

const Input = ({data, setData, name, isRequired, prefilled, fetchingInfos, children}) => {


    /* 
    * If the "fetchingInfos" prop is filled with a value, this means there is a firestore 
    * collection of suggestions for this field. 
    */

    //For this, we create a state to store the suggestions
    const [choicesList, setChoicesList] = useState([]);

    //Then, only once, we execute this code
    useEffect(() => {
        
        //Function call
        if(fetchingInfos){
            //try to fetch it
            try{
                const fetchCollection = async () => {
                    const receivedCollection = await firestore.collection(fetchingInfos).get();
                    
                    //If it worked, we look through the result
                    receivedCollection.docs.forEach(doc => {
                        let data = doc.data().name;
                        setChoicesList(choicesList => [...choicesList, data]);
                    })

                }
                fetchCollection();
                
            //If something goes wrong, do something
            } catch(error){
                console.error(error);
            }
        }

    }, [fetchingInfos]);

    //Lastly, function to filter and display the options when the user
    //For this, we will create a new state of the elements to display
    const [choicesToDisplay, setChoicesToDisplay] = useState([]);

    useEffect(() => {

        const updateChoicesToDisplay = () => {

            if(data[name]){   //the only reason for this condition is to prevent a hugh bug is there is no property in the state fiting the name
                let newValues = [];

                if(data[name].length > 1){
        
                    const normalizedCurrentValue = data[name].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        
                    choicesList.forEach( choice => {
                        const normalizedChoice = choice.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                        if(
                            normalizedChoice.includes(normalizedCurrentValue) && 
                            normalizedChoice !== normalizedCurrentValue &&
                            newValues.length < 8)
                                { newValues.push(choice) }
                    })
                }

                setChoicesToDisplay([...newValues]);
            }
        }

        //Call the function to activate the choices only if this option is activated
        if(fetchingInfos){ 
            updateChoicesToDisplay();
        }
        

    }, [fetchingInfos, choicesList, data, name])
    

    //Define if the element is required and add the property in the JSX
    const requirement = {};
    if(isRequired){ requirement['required'] = 'required' }

    //Update the state
    const eventHandler = (e) => {
        setData({...data, [name]: e.target.value})
    }

    

    /*
     * 
     *  The name value is going to have to be passed as a props
     */
    return(
    
        <label className={`${styles.inputComponent} col-12`}>
            <div className="col-12">
            {isRequired && <div className="asterisk">&#x2724;</div>}
            { children }
            </div>
            <br/>

            <input
                type="text"
                name={name}
                value={data[name]}
                placeholder={prefilled}
                { ...requirement }
                onChange={eventHandler}
            />

            {fetchingInfos && 
                <ul className={`${styles.choicesContaier} col-12`}>
                    { choicesToDisplay.map( choice => {
                        return <li key={`choice-${choice}`} onClick={() => { setData({...data, [name]: choice}) }}>{choice}</li>})}
                </ul>
            }

            

        </label>
        
    );
}

export default Input;