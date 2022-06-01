
import { useState, useEffect, useRef } from 'react'

//components
import SingleApprobationPanel from './SingleApprobationPanel/SingleApprobationPanel'
import FindSceneOrSongForm from '../../RepetitiveForms/FindSceneOrSongForm/FindSceneOrSongForm'

import styles from './FindGroupForm.module.scss'



const FindGroupForm = ({ functionCallBack }) => {


    const [selectedForm, setSelectedForm] = useState();

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
            {/* Display the result */}
            {   
                selectedForm &&
                <SingleApprobationPanel callBackFunction={callBackWithData} {...selectedForm}  form={selectedForm} clear={() => setSelectedForm(null)}/>
            }
            {/* Search tool */}
            <div className="col-12">
                <FindSceneOrSongForm updateStateWithSearchValue={setSelectedForm} />
            </div>
        
        </div>
    )
}

export default FindGroupForm