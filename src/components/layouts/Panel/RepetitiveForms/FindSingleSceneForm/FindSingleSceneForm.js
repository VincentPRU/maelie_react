import { useRef, useEffect, useState } from 'react'

import styles from './FindSingleSceneForm.module.scss'

//Components
import Input from '../../../../forms/fields/Input/Input'
import SearchResult from '../../SearchResult/SearchResult'
import SingleApprobationPanel from '../../subPanels/FindGroupForm/SingleApprobationPanel/SingleApprobationPanel'

//Bg utils
import { fetchScenesForAudioField, fetchAllAcceptedScenes } from '../../../Scene/sceneControl/utils/scenesDbQueries'

/*

        The main goal with this component is to return a 'user selected' form that contain the desired scene audio.
        This is going to fill the scene audio maping  

*/

const FindSingleSceneForm = ({audioField, noAudioChange, noAudioDisplay, updateStateWithSearchValue}) => {

    //Audiofield is specified if the form has to look for a specefic field

    //first step : receive the options (containing the wanted audio field)
    const options = useRef([]); //going to contain the data

    const [validPropositions, setValidPropositions] = useState([]);
    const [inputData, setInputData] = useState({
        text: ""
    })


    //Fetch the data once
    useEffect(() => {

        const fetchData = async () => {

            if(audioField){
                let tempArray = await fetchAllAcceptedScenes()

                for(let i = 0; i < tempArray.length; i++){

                    if(!tempArray[i].audioFiles[audioField]){

                        tempArray.splice(i, 1);
                        i = -1;

                    }
                }

                options.current = tempArray

            } else {
                options.current = await fetchAllAcceptedScenes()
            }
        }

        //if undefined, then call the function to fetch the data
        if(options.current.length < 1){
            fetchData()
        }

    },[options])

    //Analyse the results
    useEffect(() => {

        //verify if the data is loaded before working with it
        if(options.current.length > 0){

            const normalizedCurrentValue = inputData.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

            let newValues = [];   //starting value is empty. Going to be usefull

            options.current.forEach(option => {

                const normalizedArtistName = option.artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                const normalizedParticipantsName = option.participantsName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                const normalizedSchool = option.school.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

                if(normalizedCurrentValue.length > 3){
                    
                    if( normalizedArtistName.includes(normalizedCurrentValue) ||
                    normalizedParticipantsName.includes(normalizedCurrentValue) ||
                    normalizedSchool.includes(normalizedCurrentValue)) 
                    {
                        //Then the condition is met and the option is good. We therefore push the option with its id
                        newValues.push(option)
                    }

                }

            
            })

            //Once every options are evaluated, we can update the state
            setValidPropositions(newValues);
        }

    }, [inputData])

    return (
        <div className={`${styles["single-scene-form"]} col-12 thinDarkScrollBar`}>
         
            <form className="col-12">
                <Input 
                    data={inputData} 
                    setData={setInputData}
                    name="text"
                    prefilled="Recherche..."
                />
            </form>
            <section>
                <h4 className="beige">Résultats : </h4>
                <div className={`${styles["results-section__scrollable-container"]}`}>
                        {
                            validPropositions.map(option => (
                                <SearchResult 
                                    key={"search_result" + option.id}
                                    artistName={option.artistName}
                                    school={option.school ? option.school : null}
                                    participantsName={option.participantsName ? option.participantsName : null}
                                    onClick={() => {updateStateWithSearchValue(option)}}
                                />
                            ))
                        }
                    </div>
            </section>
        </div>
    )
}

export default FindSingleSceneForm