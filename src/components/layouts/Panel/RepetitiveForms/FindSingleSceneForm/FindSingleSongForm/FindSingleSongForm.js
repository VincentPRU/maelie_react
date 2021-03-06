import { useRef, useEffect, useState } from 'react'

//Db queries
import { getAllChoralGeneral } from '../../../../Scene/sceneControl/utils/choralDbQueries'

//Components
import Input from '../../../../../forms/fields/Input/Input'
import SearchResult from '../../../SearchResult/SearchResult'

import styles from './FindSingleSongForm.module.scss'



const FindSingleSongForm = ({updateStateWithSearchValue}) => {


    //first step : receive the options (containing the wanted audio field)
    const options = useRef([]); //going to contain the data
    const [dataLoaded, setDataLoaded] = useState(false)

    //Number of elements to display at the same time
    const propositionNumberDefault = 10;
    const [propositionNumber, setPropositionNumber] = useState(propositionNumberDefault);

    const [validPropositions, setValidPropositions] = useState([]);
    const [inputData, setInputData] = useState({
        text: ""
    })




    //Fetch all the accepted songs data only once
    useEffect(() => {
        const fetchData = async () => {
            let tempArray = await getAllChoralGeneral();
  
            //Make sure the field choraleIndependante is present.
            for(let i = 0; i < tempArray.length; i++){
                if(!tempArray[i].audioFiles.choraleIndependante){
                    tempArray.splice(i, 1);
                    i = -1;
                }
            }
            options.current = tempArray
            options.current.sort((a, b) => b.createdAt - a.createdAt )

            //tell the component to rerender because the data is now loaded
            setDataLoaded(true)
        }
        fetchData()
    }, [])

    //Analyse the results
    useEffect(() => {

        //verify if the data is loaded before working with it
        if(options.current.length > 0){

            const normalizedCurrentValue = inputData.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

            let newValues = [];   //starting value is empty. Going to be usefull

            options.current.forEach(option => {

                const normalizedChoristNames = option.choristNames.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                const normalizedSchool = option.school.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

                if(normalizedCurrentValue.length > 0){
                    
                    if( normalizedChoristNames.includes(normalizedCurrentValue) || normalizedSchool.includes(normalizedCurrentValue)) 
                    {
                        //Then the condition is met and the option is good. We therefore push the option with its id
                        newValues.push(option)
                    }

                }

                if(normalizedCurrentValue.length === 0) newValues.push(option)

            
            })

            //Once every options are evaluated, we can update the state
            setValidPropositions(newValues);

            //That is my preference but not required. Reduce the number of options displayed to its initial value when searching the input field
            if(propositionNumberDefault !== propositionNumber) setPropositionNumber(propositionNumberDefault)
        }

    }, [inputData, dataLoaded])

    return (
        <div className={`${styles["single-song-form"]} col-12 thinDarkScrollBar`}>

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
                    <h4 className="beige">R??sultats {validPropositions && `(${validPropositions.length})`} : </h4>
                }
                {
                    validPropositions.length === 0 && dataLoaded &&
                    <div className={`col-12 ${styles["single-entry-form__message-container"]}`}>
                        <h4>Aucun r??sultat n'existe pour ta recherche</h4>
                        <small>N'h??site pas ?? essayer avec d'autres mots-cl??s.</small>
                    </div>
                }
                {
                    !dataLoaded &&
                    <>
                        <h4 style={{marginBottom: "0px"}} className="beige">Les donn??es sont en chargement</h4>
                    </>
                }
                <div className={`${styles["results-section__scrollable-container"]}`}>
                        {
                            validPropositions.map((option, index) => (
                                <>
                                { index < propositionNumber &&  
                                    <SearchResult 
                                        key={"search_result" + option.id}
                                        choristNames={option.choristNames}
                                        artistName={null}
                                        school={option.school ? option.school : null}
                                        participantsName={null}
                                        date={option.createdAt}
                                        onClick={() => {updateStateWithSearchValue(option)}}
                                    />
                                }
                                </>
                            ))
                        }
                        {
                            validPropositions.length > propositionNumber &&
                            <button onClick={() => {setPropositionNumber(propositionNumber + propositionNumberDefault)}} className="beige col-12">Afficher plus de r??sultats</button>
                        }
                    </div>
            </section>

        </div>
    )
}

export default FindSingleSongForm