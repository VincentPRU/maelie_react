import React from 'react';

import styles from './Textarea.module.scss';

/*
*
*    Data : Data of all the state object
*    setData : Edit the state object
*    name : name of the property to refer in the state object. Super important !
*    isRequired : Bool that is going to tel the browser if the feild is required to be filed
*    prefilled : String that receive a value to display into the feild. Empty if nothing to show
*    Children : text to display in the label
*
*/

const Textarea = ({data, setData, name, isRequired, prefilled, children}) => {

    //Define if the element is required and add the property in the JSX
    const requirement = {};
    if(isRequired){ requirement['required'] = 'required' }

    //Update the state
    const eventHandler = (e) => {
        setData({...data, [name]: e.target.value})
    }

    return(
        
        <label className={styles.textareaComponent}>

            <div className="col-12">
                {isRequired && <div className="asterisk">&#x2724;</div>}
                { children }
            </div>

            <br/>

            <textarea 
                type="text"
                name={name}
                placeholder={prefilled}
                rows={5}
                { ...requirement }
                onChange={eventHandler}
            />

         </label>
        
    );
}

export default Textarea;