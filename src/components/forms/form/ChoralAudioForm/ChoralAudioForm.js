import React from 'react';

import styles from './ChoralAudioForm.module.scss';

import File from '../../fields/File/File';



const ChoralAudioForm = ({ data, setData }) => {

    return(
        <div className={styles.choralAudioForm }>
            
            <h5>Chorale virtuelle</h5>
            <p>Mon enregistrement doit être intégré au montage du chœur virtuel.</p>
            <File data={data} setData={setData} name="choraleVirtuelle1" isRequired={false}>Voix 1, solo ou groupe, avec piste de référence</File>
            <File data={data} setData={setData} name="choraleVirtuelle2" isRequired={false}>Voix 2, solo ou groupe, avec piste de référence</File>
            
            <h5>Chorale indépendante </h5>
            <p>J'ai enregistré ma chorale et le fichier est prêt à être intégré tel quel au module de conte interactif.</p>
            <File data={data} setData={setData} name="choraleIndependante" isRequired={false}>Groupe à 1 ou 2 voix, direction libre</File>


        </div>
    );

}


export default ChoralAudioForm;