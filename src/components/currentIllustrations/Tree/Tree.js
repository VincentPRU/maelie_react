import React from 'react';

import tree from '../../../images/illustrations/arbre.png'
import styles from './Tree.module.scss'

const Tree = ( {top, left, height, background, blurBackground, reverse, parentwidth, minHeight} ) => {


    //Top position is going to be relative to the parent element width
    const topPos = (parseFloat(top) * parentwidth) + 'px';

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "5rem";


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
                className={`
                    ${styles.treeComponent} 
                    ${background ? styles.background : ""} 
                    ${blurBackground ? styles.blurBackground : ""}  
                    ${reverse ? styles.reverse : ""}
                    `}
                src={tree} 
                alt="Illustration d'arbre" />
        </>
    );

}

export default Tree;
