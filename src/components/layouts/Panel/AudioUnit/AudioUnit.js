
import { useState, useEffect } from 'react'

//components
import FindSingleSceneForm from '../RepetitiveForms/FindSingleSceneForm/FindSingleSceneForm'
import FindSingleSongForm from '../RepetitiveForms/FindSingleSceneForm/FindSingleSongForm/FindSingleSongForm'
import Button from '../../../Button/Button'
import SingleApprobationPanel from '../subPanels/FindGroupForm/SingleApprobationPanel/SingleApprobationPanel'

import styles from './AudioUnit.module.scss'


const AudioUnit = ({data, index, dataName, map, setMap, editable}) => {

    /*
        Is the audio specifically for the song of Maélie
    */
    const isMaelieSong = dataName === "choraleIndependante" ? true : false

    const [audioEditingMode, setAudioEditingMode] = useState(false);
    const [currentValue, setCurrentValue] = useState(data)

    const [selectedForm, setSelectedForm] = useState();

    useEffect(() => {

        if(currentValue && currentValue !== data){
            setMap({
                ...map,
                [dataName]: currentValue[dataName]
            })
        }

    }, [currentValue])


    const callBackFunction = ( returnedData ) => {

        setCurrentValue(returnedData)   //pass the data
        setSelectedForm(null)           //Close the window
        setAudioEditingMode(false)

    } 


    return (
        <li className={`${styles["audio-unit"]} ${styles["no-wrap"]} ${ data && (isMaelieSong ? styles["audio-unit--contains-data-maelies-song"] : styles["audio-unit--contains-data"])} col-12`}>


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


            {audioEditingMode && !selectedForm && editable &&
                <section className={`${styles["audio-unit__edit-section"]}`}>
                    
                    { isMaelieSong &&
                        <> 
                            <div className="col-12">
                                <h3 className="col-12">Sélectionne un artiste</h3>
                                <p className="beige col-12">Ce sera sa version de la chanson de Maélie qui jouera lors de la lecture du conte.</p>
                            </div>
                            {/* Form with searchinput and fields specifically  Maélie's song  */} 
                            <FindSingleSongForm
                                updateStateWithSearchValue={setSelectedForm}
                            />
                        </>
                    }
                    { !isMaelieSong &&
                        <> 
                            {/* Form with searchinput and fields specifically for scenes  */} 
                            <div className="col-12">
                                <h3 className="col-12">Sélectionne un artiste</h3>
                                <p className="beige col-12">La scène que tu as choisi d'éditer recevra l'extrait audio correspondant de cet artiste.</p>
                            </div>
                            <FindSingleSceneForm 
                                audioField={dataName} 
                                updateStateWithSearchValue={setSelectedForm}
                                noAudioDisplay 
                            />
                        </>
                    }
                    
                    
                    <div className={`${styles["edit-section__button-container"]} col-12`}>
                        <Button color="white" reverse onClick={() => setAudioEditingMode(false)} >Retour</Button>
                    </div>
                </section>
            }

            
            <div className={`${styles["audio-unit__text-container"]}`}>
                <strong>
                    { isMaelieSong && 
                        <>Chanson de Maélie : </>
                    }
                    { !isMaelieSong &&
                        <>Scène {index + 1} : </>
                    }
                </strong>
                { data ? (data.artistName ? data.artistName : data.choristNames) : "Espace vide"}
            </div>
            {editable &&
                <button onClick={() => setAudioEditingMode(true)} className={`${styles["audio-unit__edit-button"]}`}>Modifier</button>
            }
        </li>
    )
}

export default AudioUnit