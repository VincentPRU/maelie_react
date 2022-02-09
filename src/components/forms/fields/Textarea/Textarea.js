import React, { useState } from 'react';



const Textarea = () => {

    const [text, setText] = useState();

    const handleChange = (event) => {
        setText(event.target.value)
    }

    return(
        <>
        <label>
            <textarea
                type="text" 
                value={text}
                name="nom"
                onChange={handleChange}
            />
         </label>
        </>
    );
}

export default Textarea;