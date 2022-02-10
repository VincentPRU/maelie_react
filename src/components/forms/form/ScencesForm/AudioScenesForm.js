import React from 'react';

import styles from './AudioScenesForm.module.scss';

import File from '../../fields/File/File';



const AudioScenesForm = ({ data, setData }) => {

    return(
        <div className={styles.AudioScenesForm}>
    
            <File data={data} setData={setData} name="audio1" isRequired={false}>Scène 1 - Village en paix / Tout le monde déteste la musique</File>
            <File data={data} setData={setData} name="audio2" isRequired={false}>Scène 2 - Le dragon arrive</File>
            <File data={data} setData={setData} name="audio3" isRequired={false}>Scène 3 - Le chevalier va attaquer le dragon</File>
            <File data={data} setData={setData} name="audio4" isRequired={false}>Scène 4 - Maellie chante pour le dragon et le calme</File>
            <File data={data} setData={setData} name="audio5" isRequired={false}>Scène 5 - Tout le monde est heureux et aime la musique</File>

        </div>
    );

}


export default AudioScenesForm;