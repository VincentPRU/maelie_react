import { useState, useEffect } from 'react'

//components
import Button from '../../../../../Button/Button'

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
                    <div className={`${styles["single-approbation-panel__type-tag-container"]} col-12 `}>
                        <div className={`${props.choristNames ? "yellow_BG" : "green_BG"} beige`}>
                        {
                            props.choristNames ? "Chant de Maélie" : "Scènes du conte"
                        }
                        </div>
                    </div>
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
                        <h4 className="col-12">Extraits audio offerts avec cette fiche </h4>
                        <ul className="col-12">
                            
                            {Object.keys(sceneMap).map((elem, index) => (
                                <>
                                { sceneMap[elem] &&
                                    <li className={`green col-12`}>
                                        <strong>
                                            Scène {index + 1} 
                                        </strong>
                                    </li>
                                }
                                </>
                            ))}
                            
                        </ul>
                        {
                            containEmptyAudio && 
                            <p className={styles.note}>À noter ! Les scènes qui ne sont pas affichées seront selectionnées de manière aléatoire lors de la lecture.</p>
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