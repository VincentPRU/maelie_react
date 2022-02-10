import React from 'react';

import styles from './ChoralForm.module.scss';

import Input from '../../fields/Input/Input';
import Select from '../../fields/Select/Select';
import Textarea from '../../fields/Textarea/Textarea';

const ChoralForm = ({ data, setData }) => {

    //Values and text for the select field
    const ageSelectOptions = [];

    for(let i = 1; i < 100; i++){
        ageSelectOptions.push({value: i, text: i});
    }



    return(
        <div className={styles.choralForm}>
    
            <Textarea data={data} setData={setData} name="choristNames" prefilled="" isRequired={true}>Nom du / de la / des choriste.s</Textarea>
            <Input data={data} setData={setData} name="school" prefilled="" fetchingInfos="schools" isRequired={false}>École</Input>
            <Select data={data} setData={setData} name="age" prefilled="" isRequired={false} emptyOption={true} otherOption={false} text="Âge :">
                {ageSelectOptions}
            </Select>
            <Input data={data} setData={setData} name="city" fetchingInfos="city" prefilled="" isRequired={true}>Municipalité</Input>
            <Input data={data} setData={setData} name="country" fetchingInfos="country" prefilled="" isRequired={true}>Pays</Input>


        </div>
    );
}

export default ChoralForm;