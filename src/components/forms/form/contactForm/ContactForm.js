import React from 'react';

import styles from './ContactForm.module.scss';

import Input from '../../fields/Input/Input';
import Select from '../../fields/Select/Select';

const ContactForm = ({ data, setData }) => {

    //Values and text for the select field
    const formSelectOptions = [
        {value: "eleve", text: "Élève"},
        {value: "enseignant", text: "Enseignant.e"},
        {value: "parent", text: "Parent"},
        {value: "chefdechoeur", text: "Chef de chœur"}
    ];


    return(
        <div className={styles.contactForm}>
            
            <Select data={data} setData={setData} name="occupation" prefilled="" isRequired={true} emptyOption={true} otherOption={true} text="Je suis un.e :">
                {formSelectOptions}
            </Select>
            <Input data={data} setData={setData} name="name" prefilled="" isRequired={true} fetchingInfos={false}>Nom</Input>
            <Input data={data} setData={setData} name="firstname" prefilled="" isRequired={true} fetchingInfos={false}>Prénom</Input> 
            <Input data={data} setData={setData} name="email" prefilled="" isRequired={true} fetchingInfos={false}>Courriel</Input>
            
        </div>
    );
}

export default ContactForm;