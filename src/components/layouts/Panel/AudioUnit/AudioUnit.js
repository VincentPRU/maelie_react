
import { useState, useEffect } from 'react'

//components
import FindSingleSceneForm from '../RepetitiveForms/FindSingleSceneForm/FindSingleSceneForm'
import Button from '../../../Button/Button'
import SingleApprobationPanel from '../subPanels/FindGroupForm/SingleApprobationPanel/SingleApprobationPanel'

import styles from './AudioUnit.module.scss'


const AudioUnit = ({data, index, dataName, map, setMap}) => {

    const [audioEditingMode, setAudioEditingMode] = useState(false);
    const [currentValue, setCurrentValue] = useState(data)

    const [selectedForm, setSelectedForm] = useState();

    useEffect(() => {

        if(currentValue && currentValue !== data){
            console.log("Current value")
            console.log(currentValue)
            setMap({
                ...map,
                [dataName]: currentValue[dataName]
            })
        }

    }, [currentValue])

    console.log("what out looping")

    const callBackFunction = ( returnedData ) => {

        setCurrentValue(returnedData)   //pass the data
        setSelectedForm(null)           //Close the window
        setAudioEditingMode(false)

    } 


    return (
        <li className={`${styles["audio-unit"]} ${styles["no-wrap"]} ${!data && styles["audio-unit--red"]} col-12`}>
            {   
                selectedForm && 
                <SingleApprobationPanel 
                    {...selectedForm} 
                    form={selectedForm} 
                    clear={() => setSelectedForm(null)}
                    callBackFunction={callBackFunction}
                    noAudioDisplay
                />
            }
            {audioEditingMode && 
                <section className={`${styles["audio-unit__edit-section"]}`}>
                    <div className="col-12">
                       <h3 className="col-12">Sélectionner un extrait audio</h3>
                       <p className="beige col-12">Celui-ci sera appliqué à la scène spécifique que tu as choisi de changer.</p>
                    </div>

                    {/* Form with searchinput and fields  */} 
                    <FindSingleSceneForm 
                        audioField={dataName} 
                        updateStateWithSearchValue={setSelectedForm}
                        noAudioDisplay 
                    />
                    
                    <div className={`${styles["edit-section__button-container"]} col-12`}>
                        <Button color="white" reverse onClick={() => setAudioEditingMode(false)} >Retour</Button>
                    </div>
                </section>
            }

            {!data &&

            <button onClick={() => setAudioEditingMode(true)} className={`${styles["audio-unit__edit-button"]}`}>&#x2710;</button>
            
            }

            <strong>Scène {index + 1} : </strong>{ data ? "Extrait audio disponible" : "Extrait manquant"}
        </li>
    )
}

export default AudioUnit