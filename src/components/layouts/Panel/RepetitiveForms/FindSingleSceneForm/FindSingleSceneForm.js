import { useRef, useEffect, useState } from 'react'

import styles from './FindSingleSceneForm.module.scss'

//Components
import Input from '../../../../forms/fields/Input/Input'
import SearchResult from '../../SearchResult/SearchResult'

//Bg utils
import { fetchAllAcceptedScenes } from '../../../Scene/sceneControl/utils/scenesDbQueries'

/*

        The main goal with this component is to return a 'user selected' form that contain the desired scene audio.
        This is going to fill the scene audio maping  

*/

const FindSingleSceneForm = ({audioField, updateStateWithSearchValue}) => {

    //Audiofield is specified if the form has to look for a specefic field

    //first step : receive the options (containing the wanted audio field)
    const options = useRef([]); //going to contain the data
    const [dataLoaded, setDataLoaded] = useState(false)

    const [validPropositions, setValidPropositions] = useState([]);

    //Number of elements to display at the same time
    const propositionNumberDefault = 10;
    const [propositionNumber, setPropositionNumber] = useState(propositionNumberDefault);

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
                options.current.sort((a, b) => b.createdAt - a.createdAt )
                //tell the component to rerender because the data is now loaded
                setDataLoaded(true)

            } else {
                options.current = await fetchAllAcceptedScenes()
                options.current.sort((a, b) => b.createdAt - a.createdAt )
                //tell the component to rerender because the data is now loaded
                setDataLoaded(true)
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

                if(normalizedCurrentValue.length > 0){
                    
                    if( normalizedArtistName.includes(normalizedCurrentValue) ||
                    normalizedParticipantsName.includes(normalizedCurrentValue) ||
                    normalizedSchool.includes(normalizedCurrentValue)) 
                    {
                        //Then the condition is met and the option is good. We therefore push the option with its id
                        newValues.push(option)
                    }

                }

                //If nothing is in the search bar
                if(normalizedCurrentValue.length === 0){ newValues.push(option) }

            
            })

            //Once every options are evaluated, we can update the state
            setValidPropositions(newValues);

            //That is my preference but not required. Reduce the number of options displayed to its initial value when searching the input field
            if(propositionNumberDefault !== propositionNumber) setPropositionNumber(propositionNumberDefault)
        }

    }, [inputData, dataLoaded])

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
                {
                    validPropositions.length > 0 && dataLoaded &&
                    <h4 className="beige">Résultats {validPropositions && `(${validPropositions.length})`} : </h4>
                }
                {
                    validPropositions.length === 0 && dataLoaded &&
                    <div className={`col-12 ${styles["single-entry-form__message-container"]}`}>
                        <h4>Aucun résultat n'existe pour ta recherche</h4>
                        <small>N'hésite pas à essayer avec d'autres mots-clés.</small>
                    </div>
                }
                {
                    !dataLoaded &&
                    <>
                        <h4 style={{marginBottom: "0px"}} className="beige">Les données sont en chargement</h4>
                    </>
                }
                <div className={`${styles["results-section__scrollable-container"]}`}>
                        {
                            validPropositions.map((option, index) => (
                                <>
                                { index < propositionNumber &&
                                    <SearchResult 
                                        key={"search_result" + option.id}
                                        artistName={option.artistName}
                                        school={option.school ? option.school : null}
                                        participantsName={option.participantsName ? option.participantsName : null}
                                        date={option.createdAt}
                                        onClick={() => {updateStateWithSearchValue(option)}}
                                    />
                                }
                                </>
                            ))
                        }
                        {
                            validPropositions.length > propositionNumber &&
                            <button onClick={() => {setPropositionNumber(propositionNumber + propositionNumberDefault)}} className="beige col-12">Afficher plus de résultats</button>
                        }
                    </div>
            </section>
        </div>
    )
}

export default FindSingleSceneForm