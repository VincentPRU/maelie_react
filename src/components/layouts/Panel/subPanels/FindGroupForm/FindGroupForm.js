
import { useState, useEffect, useRef } from 'react'

//Db queries
import { fetchAllAcceptedScenes } from '../../../Scene/sceneControl/utils/scenesDbQueries'

//components
import SingleApprobationPanel from './SingleApprobationPanel/SingleApprobationPanel'
import FindSingleSceneForm from '../../RepetitiveForms/FindSingleSceneForm/FindSingleSceneForm'

import styles from './FindGroupForm.module.scss'



const FindGroupForm = ({ functionCallBack }) => {


    const [selectedForm, setSelectedForm] = useState();

/*
    //Hold all the scene data
    const scenesData = useRef([]);
    */

    //data to return
    const sceneMap = useRef({
        audio1: null,
        audio2: null,
        audio3: null,
        audio4: null,
        audio5: null
    })

    const callBackWithData = ( returnedData ) => {

        functionCallBack(returnedData)

    }
/*
    //Fetch all the accepted scenes data
    useEffect(() => {
        const fetchData = async () => {
            scenesData.current = await fetchAllAcceptedScenes();
        }
        fetchData()
    }, [])
*/
    



    return (
        <div className={`${styles["find-group-component"]} col-12`}>
            {   
                selectedForm &&
                <SingleApprobationPanel callBackFunction={callBackWithData} {...selectedForm}  form={selectedForm} clear={() => setSelectedForm(null)}/>
            }
            <div className="col-12">
                <FindSingleSceneForm updateStateWithSearchValue={setSelectedForm} />
            </div>
        
        </div>
    )
}

export default FindGroupForm