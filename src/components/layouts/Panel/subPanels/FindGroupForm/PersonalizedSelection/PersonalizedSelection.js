import { useState } from 'react'

//components
import AudioUnit from '../../../AudioUnit/AudioUnit'
import Button from '../../../../../Button/Button'


import styles from './PersonalizedSelection.module.scss'


const PersonalizedSelection = ({ functionCallBack }) => {

    const [localAudioMap, setLocalAudioMap] = useState({
        audio1: null,
        audio2: null, 
        audio3: null, 
        audio4: null,
        audio5: null,
        choraleIndependante: null
    })

    const submitValues = () => {
        functionCallBack(localAudioMap)
    }

    return (
        <section className={`col-12 ${styles["personalized-selection"]}`}>
            
            <ul className="col-12">

                {Object.keys(localAudioMap).map((elem, index) => (
                    <AudioUnit
                        key={"PersonalizedSelection" + elem}
                        index={index}
                        dataName={elem} 
                        data={localAudioMap[elem]}
                        map={localAudioMap}
                        setMap={setLocalAudioMap}
                        editable
                    />
                ))}

            </ul>
            <div className={`col-12 ${styles["personalized-selection__button-container"]}`}>
                <Button onClick={() => submitValues()} color="white" reverse>Écouter le conte</Button>
            </div>
            
        </section>
    )
}

export default PersonalizedSelection