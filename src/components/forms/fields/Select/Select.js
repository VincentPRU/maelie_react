import React, { useState } from 'react';
import Input from '../Input/Input';

import styles from './Select.module.scss';



const Select = ({data, setData, name, isRequired, prefilled, text, emptyOption, otherOption, children, horizontalAlignment}) => {

    //Piece of state dedicated to display or not the input if the user wants to enter a personalised option
    const [ inputState, setInputState] = useState(false);

    //Define if the element is required and add the property in the JSX
    const requirement = {};
    if(isRequired){ requirement['required'] = 'required' }

    //Update the state and verify if the selected element require some action
    const eventHandler = (e) => {



        //If the selected option represent the other option, 
        //then we want to display an input field to leet the user enter the information
        const select = e.target;
        if(select.children[select.selectedIndex].hasAttribute("data-other")){
            //Display the input for personnalised occupation
            if(!inputState){setInputState(true)}
            setData({...data, [name]: ""})
            return; //to prevent the state to update itself with empty value
        }

        //Bring back the state to false and hide the input if the user select another option
        if(inputState){setInputState(false)}

        setData({...data, [name]: e.target.value})
    }

    /******
     * 
     *  The name value is going to have to be passed as a props
     */
    return(
    
        <label className={styles.selectComponent}>

            <div className="col-12">
            {isRequired && <div className="asterisk">&#x2724;</div>}
            { text }
            </div>

            { !horizontalAlignment && <br/> }

            <select
                type="text"
                name={name}
                placeholder={prefilled}
                { ...requirement }
                onChange={eventHandler}
            >

                {/* If the option is selected, start with an empty option */}
                {emptyOption && <option value="">-</option>}

                {/* Display the options passed has children */}
                {children.map( option => {
                    return <option key={`occupation-${option.value}`} value={option.value}>{option.text}</option>
                })}

                {/* If the option is selected, start with an empty option */}
                {otherOption && <option data-other value="">Autre</option>}

            </select>

            {/* If the user choose the "other" option, then display the input */}
            {inputState && <Input data={data} setData={setData} name={name} isRequired={true} { ...requirement } prefilled="Autre"/>}
        </label>
        
    );
}

export default Select;