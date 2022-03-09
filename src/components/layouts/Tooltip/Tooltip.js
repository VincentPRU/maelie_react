
import { useState } from 'react' 


import styles from './Tooltip.module.scss'


const Tooltip = ({top, color, children}) => {

    //Top property is a booleen that indicates the orientation of the component


    return (
        <div className={`
            ${styles.toolTipComponent} 
            ${top ? styles.toolTipTopPos : styles.toolTipBottomPos }
            ${color ? styles[color] : ""}
        `}>
            
            <div className={styles.textContent}>
                {children}
            </div>

            <div  className={`${styles.bottomArrow} ${top ? styles.topPos : "" }`}>

            </div>

        </div>
    );
}

export default Tooltip