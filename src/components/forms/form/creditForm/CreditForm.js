import React from 'react';

import styles from './CreditForm.module.scss';

import Input from '../../fields/Input/Input';
import Select from '../../fields/Select/Select';
import Textarea from '../../fields/Textarea/Textarea';

const CreditForm = ({ data, setData }) => {

    //Values and text for the select field
    const ageSelectOptions = [];

    for(let i = 1; i < 100; i++){
        ageSelectOptions.push({value: i, text: i});
    }



    return(
        <div className={styles.creditForm}>
    
            <Input data={data} setData={setData} name="artistName" prefilled="" fetchingInfos={false} isRequired={true}>Nom d'artiste ou de groupe</Input>
            <Textarea data={data} setData={setData} name="participantsName" prefilled="" isRequired={false}>Nom du ou des jeunes qui ont participé à la bande sonore</Textarea>
            <Input data={data} setData={setData} name="school" prefilled="" fetchingInfos="schools" isRequired={false}>École</Input>
            <Select data={data} setData={setData} name="age" prefilled="" isRequired={false} emptyOption={true} otherOption={false} text="Âge :">
                {ageSelectOptions}
            </Select>
            <Input data={data} setData={setData} name="city" fetchingInfos="city" prefilled="" isRequired={true}>Municipalité</Input>
            <Input data={data} setData={setData} name="country" fetchingInfos="country" prefilled="" isRequired={true}>Pays</Input>


        </div>
    );
}

export default CreditForm;