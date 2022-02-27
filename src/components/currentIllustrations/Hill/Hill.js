import React from 'react';


import styles from "./Hill.module.scss";

//Left represent the alignment of the image. 
//Perfectly centered would be a value of 50%
//Width is there to help with overflow. 
// A value of 150% will hide a total 50% of the image
const Hill = ({ img, left, right, top, width, reverse, parentwidth, height}) => {



    //Height value. If there is one, then there is no width to preserve proportions
    const heightValue = height ? height: "";  
    const widthValue = heightValue ? "auto" : width;
    
    //If the element positionning is relative to the height, then its better to make the same with the top property
    const topPos = height ? parseFloat(top) + "vh" : parseInt(top * parentwidth) + 'px';

    const style = {
        'left': right ? "" : left, 
        'right': right ? right : "", 
        'width': widthValue, 
        'top': topPos, 
        'height': heightValue
    }


    return (

        <>
            <img 
                className={`${styles.hillComponent} ${reverse ? styles.reverse : ""}`} 
                alt="Illustration de montage" 
                src={ img } 
                style={ style } 
                />
        </>
    );

}

export default Hill