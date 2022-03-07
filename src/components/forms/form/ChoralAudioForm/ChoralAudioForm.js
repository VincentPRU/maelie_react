import React from 'react';

import styles from './ChoralAudioForm.module.scss';

import File from '../../fields/File/File';



const ChoralAudioForm = ({ data, setData }) => {

    return(
        <div className={styles.choralAudioForm }>
    
            <File data={data} setData={setData} name="audio1" isRequired={false}>Voix 1</File>
            <File data={data} setData={setData} name="audio2" isRequired={false}>Voix 2</File>


        </div>
    );

}


export default ChoralAudioForm;