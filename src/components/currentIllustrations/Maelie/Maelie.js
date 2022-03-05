import React from 'react'


import styles from './Maelie.module.scss'

import maelie from '../../../images/illustrations/Maelie.png'
import maelieChant from '../../../images/illustrations/Maelie_chant.png'
import notes from '../../../images/illustrations/notes.png'

const Maelie = ({ left, top, minHeight, height, singing, higher }) => {
    

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
        <div className={`${styles.maeliesComponent} ${higher && styles.further}`}>
            <img 
                style={style} 
                className={``} 
                alt="Illustration de Maelie, personnage principal du conte" 
                src={ maelie } 
            />
            <div className={`${styles.singing} ${singing ? styles.visible : ""}`} >
                <img 
                    className={`${styles.singingMaelie}`} 
                    alt="Illustration de Maelie, personnage principal du conte" 
                    src={ maelieChant } 
                />
                <img 
                    className={`${styles.notes} ${styles.notes1}`}
                    alt="Illustration de notes de musique"
                    src={ notes }
                />
                <img 
                    className={`${styles.notes} ${styles.notes2}`}
                    alt="Illustration de notes de musique"
                    src={ notes }
                />
            </div>
        </div>
    );
}

export default Maelie