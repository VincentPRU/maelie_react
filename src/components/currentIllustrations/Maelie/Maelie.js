import React from 'react'


import styles from './Maelie.module.scss'

import maelie from '../../../images/illustrations/Maelie.png'
import maelieChant from '../../../images/illustrations/Maelie_chant.png'

const Maelie = ({ left, top, minHeight, height }) => {
    

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "10rem";



    const style = {
        top: parseFloat(top) + "vh",
        left: left,
        height: height,
        minHeight: minimumHeight
    }

    return (
        <>
            <img 
                style={style} 
                className={`${styles.maeliesComponent}`} 
                alt="Illustration de Maelie, personnage principal du conte" 
                src={ maelie } 
            />
        </>
    );
}

export default Maelie