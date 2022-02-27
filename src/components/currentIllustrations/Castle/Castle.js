import React from 'react'


import styles from './Castle.module.scss'

import castleImg from '../../../images/illustrations/chateau.png'

const Castle = ({ right, top, minHeight, height }) => {

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "4rem";

    const style = {
        top: parseFloat(top) + "vh",
        right: right,
        height: height,
        minHeight: minimumHeight
    }

    return (
        <>
            <img 
                style={style} 
                className={`${styles.castleComponent}`} 
                alt="Illustration d'un château" 
                src={ castleImg } 
            />
        </>
    );
}

export default Castle