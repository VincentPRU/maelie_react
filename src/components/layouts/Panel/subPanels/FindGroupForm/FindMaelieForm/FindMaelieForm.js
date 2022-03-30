
import { useState } from 'react'



//components
import SingleApprobationPanel from './../SingleApprobationPanel/SingleApprobationPanel'
import FindSingleSceneForm from '../../../RepetitiveForms/FindSingleSceneForm/FindSingleSceneForm'
import FindSingleSongForm from '../../../RepetitiveForms/FindSingleSceneForm/FindSingleSongForm/FindSingleSongForm'

import styles from './FindMaelieForm.module.scss'




const FindMaelieForm = ({ functionCallBack }) => {

    const [selectedForm, setSelectedForm] = useState();

    

    const callBackWithData = ( returnedData ) => {
        if(functionCallBack){
            functionCallBack(returnedData)
        }
        console.log("call back function")
        console.log(returnedData)
    }




    return (
        <div className={`${styles["find-maelie-song-component"]} col-12`}>
            {   
                selectedForm &&
                <SingleApprobationPanel callBackFunction={callBackWithData} {...selectedForm}  form={selectedForm} clear={() => setSelectedForm(null)}/>
            }
            <div className="col-12">
                <FindSingleSongForm updateStateWithSearchValue={setSelectedForm} />
            </div>
        
        </div>
    )
}

export default FindMaelieForm
