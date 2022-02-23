import React from 'react';


import styles from "./Hill.module.scss";

//Left represent the alignment of the image. 
//Perfectly centered would be a value of 50%
//Width is there to help with overflow. 
// A value of 150% will hide a total 50% of the image
const Hill = ({ img, left, top, width, reverse, parentwidth}) => {

    //Top position is going to be relative to the parent element width
    const topPos = parseInt(top * parentwidth) + 'px';

    

    return (

        <>
            <img 
                className={`${styles.hillComponent} ${reverse ? styles.reverse : ""}`} 
                alt="Illustration de montage" 
                src={ img } 
                style={{ 'left': left, 'width': width, 'top': topPos }} 
                />
        </>
    );

}

export default Hill