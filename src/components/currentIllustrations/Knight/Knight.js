/*

    Knight component 

*/

import styles from './Knight.module.scss'

import knightIllustration from '../../../images/illustrations/chevalier.png'

const Knight = ({ minHeight, height, rightAlign, fightingMode, animDelay, dyingMode }) => {

    const rightAlignClass = rightAlign ? styles.rightSelfOverflowing : "";

    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "10rem";

    let fightModeClass = fightingMode ? styles.fightingMode : "";
    const animationDelayClass = fightingMode && animDelay ? styles[animDelay] : "";

    //if knight is dying, replace the fighting class by this one
    if(dyingMode){fightModeClass = styles.dyingKnight}

    const style = {
        minHeight: minimumHeight,
        height: height
    }

    return (
        
        <>
            <img 
                style={ style }
                className={`${styles.knightComponent} ${rightAlignClass} ${animationDelayClass} ${fightModeClass}`} 
                alt="Illustration de chevalier" 
                src={ knightIllustration } />
        </>
    
    );
}

export default Knight