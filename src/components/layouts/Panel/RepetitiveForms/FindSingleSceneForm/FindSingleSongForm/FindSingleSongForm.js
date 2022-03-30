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

                if(normalizedCurrentValue.length > 3){
                    
                    if( normalizedChoristNames.includes(normalizedCurrentValue) || normalizedSchool.includes(normalizedCurrentValue)) 
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
        <div className={`${styles["single-song-form"]} col-12 thinDarkScrollBar`}>

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
                                    choristNames={option.choristNames}
                                    artistName={null}
                                    school={option.school ? option.school : null}
                                    participantsName={null}
                                    onClick={() => {updateStateWithSearchValue(option)}}
                                />
                            ))
                        }
                    </div>
            </section>

        </div>
    )
}

export default FindSingleSongForm