import { useState, useEffect } from 'react'

//components
import Button from '../../../../../Button/Button'
import AudioUnit from '../../../AudioUnit/AudioUnit'

import styles from './SingleApprobationPanel.module.scss'

/*

        White section

*/
const SingleApprobationPanel = ( props ) => {

    const [containEmptyAudio, setContainerEmptyAudio] = useState(false)

    const endingSongMode = props.choristNames ? true : false
    
    //ultimate value to return
    //Filled only with the fields that aren't empty
    const [sceneMap, setSceneMap] = useState({
        audio1: props.form.audioFiles.audio1 ? props.form : null,
        audio2: props.form.audioFiles.audio2 ? props.form : null,
        audio3: props.form.audioFiles.audio3 ? props.form : null,
        audio4: props.form.audioFiles.audio4 ? props.form : null,
        audio5: props.form.audioFiles.audio5 ? props.form : null
    })


    console.log(sceneMap)

    useEffect(() => {
        //Verify if there is any missing audio file
        Object.keys(sceneMap).forEach(elem => {
            if(!containEmptyAudio && !sceneMap[elem]){
                setContainerEmptyAudio(true)
            }
        })
    }, [containEmptyAudio])


    
    return (
        <div className={`${styles["single-approbation-panel"]} red`}> 
            <h5>Voulez-vous sélectionner la fiche suivante ? </h5>

            <div>
                <div className="col-12">
                    <h3>
                        {props.choristNames ? props.choristNames : props.artistName}
                    </h3>
                    {
                        props.participantsName &&
                        <p><strong>Participants : </strong>{props.participantsName}</p>
                    }
                    {
                        props.school &&
                        <p><strong>École : </strong>{props.school}</p>
                    }
                    {
                        props.age &&
                        <p><strong>Âge : </strong>{props.age}</p>
                    }
                    {
                        (props.city || props.country) &&
                        <p>{props.city && props.city}
                        {(props.city && props.country) && ", "}
                        {props.country && props.country}
                        </p>
                    }

                </div>
           

                { !props.noAudioDisplay && !endingSongMode &&
                    <>
                        <h4 className="col-12">Extraits audio</h4>
                        <ul className="col-12">
                            
                            {Object.keys(sceneMap).map((elem, index) => (
                
                                <AudioUnit 
                                    key={props.form.id + "" + index} 
                                    index={index}
                                    dataName={elem} 
                                    data={sceneMap[elem]}
                                    map={sceneMap}
                                    setMap={setSceneMap}
                                />
                            
                            ))}
                            
                        </ul>
                        {
                            containEmptyAudio && 
                            <p className={styles.note}>À noter ! Si tu ne sélectionnes pas toi-même les extraits audio manquants, ils seront choisis au hasard pour toi.</p>
                        }
                    </>
                    }
            

                
            

            <div className={`${styles["single-approbation-panel__buttons-container"]}`}>
                <Button color="green" onClick={() => props.callBackFunction(endingSongMode ? {choraleIndependante: props.form} :  sceneMap)}>Sélectionner la fiche</Button>
                <Button onClick={props.clear}>En choisir une autre</Button>

            </div>
            </div>
        </div>
    )

}

export default SingleApprobationPanel