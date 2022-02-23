import React, { useRef, useContext, useState, useEffect } from 'react'

import styles from './Dragon.module.scss'

import { ScrollContext } from '../../../contexts/ScrollEvent'

import dragonFache from '../../../images/illustrations/dragon_fache.png'
import dragonHyp from '../../../images/illustrations/dragon_hyp.png'


const Dragon = ( {dragonHypnotized, top, width, left, height, background, parentwidth, minHeight, fadeIn} ) => {

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
    const topPos = (parseFloat(top) * parentwidth) + 'px';

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "4rem";

    const dispayClass = fadeIn && display ? "fade-Intro--In" : "";

    
    const style = {
        top: topPos,
        left: left,
        height: height,
        width: width,
        minHeight: minimumHeight
    }

    return (
        <>
            <img 
                ref= { ref }
                style={style} 
                className={`${styles.dragonComponent} ${background ? styles.background : ""} ${fadeIn && "fade-Intro"} ${dispayClass}`} 
                alt="Illustration de dragon" 
                src={ dragon } />
        </>
    );

}

export default Dragon;