import React from 'react';

import styles from './File.module.scss';

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

const File = ({data, setData, name, isRequired, children}) => {

    //Define if the element is required and add the property in the JSX
    const requirement = {};
    if(isRequired){ requirement['required'] = 'required' }

    //Update the state
    const eventHandler = (event) => {
        const file = event.target.files[0];
        setData({...data, [name]: file})
    }

    return(
        
        <label className={styles.fileForm}>

            <div className="col-12">
                {isRequired && <div className="asterisk">&#x2724;</div>}
                { children }
            </div>

            <br/>

            <input 
                type="file" 
                name={name}
                { ...requirement }
                onChange={eventHandler}
            />

         </label>
        
    );
}

export default File;