import React from 'react'

import styles from './House.module.scss'
import house200 from '../../../images/illustrations/maison_200.png'
import house400 from '../../../images/illustrations/maison_400.png'


const House = ( {fileSize, top, left, height, background, parentwidth, minHeight, reverse} ) => {

    //select the size of the house
    const house = fileSize === 200 ? house200 : house400;

    //Top position is going to be relative to the parent element width
    const topPos = (parseFloat(top) * parentwidth) + 'px';

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "4rem";
    
    const style = {
        top: topPos,
        left: left,
        height: height,
        minHeight: minimumHeight
    }

    return (
        <>
            <img style={style} className={`${styles.houseComponent} ${background ? styles.background : ""} ${reverse && styles.reverse}`} alt="Illustration de maison" src={ house } />
        </>
    );

}

export default House;