import React from 'react'

import styles from './Dragon.module.scss'

import dragonFache from '../../../images/illustrations/dragon_fache.png'
import dragonHyp from '../../../images/illustrations/dragon_hyp.png'


const Dragon = ( {dragonHypnotized, top, left, height, background, parentwidth, minHeight} ) => {

    //select the size of the house
    const dragon = dragonHypnotized ? dragonHyp : dragonFache;

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
            <img 
                style={style} 
                className={`${styles.dragonComponent} ${background ? styles.background : ""}`} 
                alt="Illustration de dragon" 
                src={ dragon } />
        </>
    );

}

export default Dragon;