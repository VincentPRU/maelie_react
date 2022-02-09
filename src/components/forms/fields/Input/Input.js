import React, { useState } from 'react';


const Input = () => {

    const [text, setText] = useState("");

    /******
     * 
     *  The name value is going to have to be passed as a props
     */
    return(
        <>
        <label>
            <input
                value={text}
                name="prenom"
                onChange={(e) => setText(e.target.value)}
            />
         </label>
        </>
    );
}

export default Input;