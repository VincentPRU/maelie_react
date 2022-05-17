import { useRef, useEffect, useState } from 'react'

//Db queries
import { getAllChoralGeneral } from '../../../Scene/sceneControl/utils/choralDbQueries'
import { fetchAllAcceptedScenes } from '../../../Scene/sceneControl/utils/scenesDbQueries'

//Components
import Input from '../../../../forms/fields/Input/Input'
import SearchResult from '../../SearchResult/SearchResult'
import styles from './FindSceneOrSongForm.module.scss'



const FindSceneOrSongForm = ({updateStateWithSearchValue}) => {


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

    //Fetch all the accepted songs data only once
    useEffect(() => {
        const fetchData = async () => {
            let tempArray = await getAllChoralGeneral();
            let sceneTempArray = await fetchAllAcceptedScenes()
  
            //Make sure the field choraleIndependante is present.
            for(let i = 0; i < tempArray.length; i++){
                if(!tempArray[i].audioFiles.choraleIndependante){
                    tempArray.splice(i, 1);
                    i = -1;
                }
            }

            //Push the data of both databases into the array
            options.current = [...tempArray, ...sceneTempArray]
            options.current.sort((a, b) => b.createdAt - a.createdAt )
            
            //tell the component to rerender because the data is now loaded
            setDataLoaded(true)
        }

        if(options.current.length < 1) fetchData()
        

    }, [options.current])

    //Analyse the results
    useEffect(() => {

        //verify if the data is loaded before working with it
        if(options.current.length > 0){

            const normalizedCurrentValue = inputData.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

            let newValues = [];   //starting value is empty. Going to be usefull

            options.current.forEach(option => {

                //Specific to scenes 
                const normalizedArtistName = option.artistName ? option.artistName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : false;
                const normalizedParticipantsName = option.participantsName ? option.participantsName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(): false;

                //Specific to maelies song
                const normalizedChoristNames = option.choristNames ? option.choristNames.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : false;

                //Commun to both
                const normalizedSchool = option.school.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

                //If something has been entered in the search bar
                if(normalizedCurrentValue.length > 0){
                    if( 
                        (normalizedChoristNames ? normalizedChoristNames.includes(normalizedCurrentValue) : false )    || 
                        (normalizedSchool ? normalizedSchool.includes(normalizedCurrentValue) : false )              ||
                        (normalizedArtistName ? normalizedArtistName.includes(normalizedCurrentValue) : false)       ||
                        (normalizedParticipantsName ? normalizedParticipantsName.includes(normalizedCurrentValue) : false )
                    ){
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

    }, [inputData, options.current.length])

    return (
        <div className={`${styles["single-entry-form"]} col-12 thinDarkScrollBar`}>

            <form className="col-12">
                <Input 
                    data={inputData} 
                    setData={setInputData}
                    name="text"
                    prefilled="Recherche..."
                />
            </form>
            <section className="col-12">
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
                                            choristNames={option.choristNames ? option.choristNames : null}
                                            artistName={option.artistName ? option.artistName : null}
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

export default FindSceneOrSongForm