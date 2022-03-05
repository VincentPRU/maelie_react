import React, { useRef, useContext, useState, useEffect } from 'react'

import styles from './Dragon.module.scss'

import { ScrollContext } from '../../../contexts/ScrollEvent'

import dragonFache from '../../../images/illustrations/dragon_fache.png'
import dragonHyp from '../../../images/illustrations/dragon_hyp.png'
import flames from '../../../images/illustrations/flamme.png'


const Dragon = ( {dragonHypnotized, hypnotizable, top, width, left, height, background, parentwidth, minHeight, fadeIn, leftAlign, throwFlames, attack, gotHypnotized} ) => {

    //Reference to the image for the animation
    const ref = useRef();

    //Displayed status of the dragon
    const [display, setDisplay] = useState(false);


    //Scrolling event
    const { scrollY } = useContext(ScrollContext);

    useEffect(() => {
        if(ref && fadeIn){
            const elemTop = ref.current.getBoundingClientRect().top;

            if(!display){
                if(elemTop < window.innerHeight * 0.66){
                    setDisplay(true);
                }
            }
        }
    }, [scrollY])

    //select the size of the house
    const dragon = dragonHypnotized ? dragonHyp : dragonFache;

    //Top position is going to be relative to the parent element width
    const topPos = top ? (parseFloat(top) * parentwidth) + 'px': "";

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "10rem";

    const dispayClass = fadeIn && display ? "fade-Intro--In" : "";
    
    const style = {
        top: topPos,
        left: left,
        width: width
    }

    const dragonWidth = width ? "100%" : "";

    const dragonStyle = {
        height: height,
        width: dragonWidth,
        minHeight: minimumHeight
    }

    const attackingClass = attack ? styles.attacking : "";

    return (
        <div 
            ref= { ref }
            style={style} 
            className={`${styles.dragonComponent} ${background ? styles.background : ""} ${fadeIn && "fade-Intro"} ${dispayClass} ${attackingClass} ${leftAlign ? styles.leftSelfOverflowing : ""}`} 
        >
            <div>
                <img 
                    style={ dragonStyle }
                    className={`${styles.dragon}`}
                    alt="Illustration de dragon" 
                    src={ dragon } />
                {
                    throwFlames &&
                    <img 
                        src={ flames }
                        alt="Illustrations de flammes crachées par un dragon"
                        className={ styles.fire }
                    />
                }
                {
                    hypnotizable &&
                    <img 
                        src={ dragonHyp }
                        alt="Illustrations de flammes crachées par un dragon"
                        className={`${styles.hypnotizable} ${gotHypnotized ? styles.displayHyp: ""}`}
                    />
                }

            </div>
           
        </div>
    );

}

export default Dragon;