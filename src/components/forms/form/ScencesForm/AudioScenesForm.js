import React from 'react';

import styles from './AudioScenesForm.module.scss';

import File from '../../fields/File/File';



const AudioScenesForm = ({ data, setData }) => {

    return(
        <div className={styles.AudioScenesForm}>
    
            <File data={data} setData={setData} name="audio1" isRequired={false}>Scène 1 - Village où tout le monde déteste la musique</File>
            <File data={data} setData={setData} name="audio2" isRequired={false}>Scène 2 - Sauf Maélie, une petite fille</File>
            <File data={data} setData={setData} name="audio3" isRequired={false}>Scène 3 - Arrivée du dragon, combat avec le chevalier</File>
            <File data={data} setData={setData} name="audio4" isRequired={false}>Scène 4 - D'autres villageois combattent le dragon, sans succès</File>
            <File data={data} setData={setData} name="audio5" isRequired={false}>Scène 5 - Maélie hypnotise le dragon avec son chant</File>

        </div>
    );

}


export default AudioScenesForm;