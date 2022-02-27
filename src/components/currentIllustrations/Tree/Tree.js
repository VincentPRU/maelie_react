import React from 'react';

import tree from '../../../images/illustrations/arbre.png'
import styles from './Tree.module.scss'

const Tree = ( {top, left, right, height, background, blurBackground, reverse, parentwidth, minHeight, viewportHeightRelative} ) => {

    //Top position is going to be relative to the parent element width or height, if viewPortHeightRelative is true
    const topPos = viewportHeightRelative ? parseFloat(top) + "vh" : (parseFloat(top) * parentwidth) + 'px';

    //If position is relative to viewport Height, then the left position needs to be too
    const leftValue = viewportHeightRelative ? parseFloat(left) + "vh" : left;
    //If position is relative to viewport Height, then the left position needs to be too
    const rightValue = viewportHeightRelative ? parseFloat(right) + "vh" : right;

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "5rem";


    const style = {
        top: topPos,
        left: right ? "" : leftValue,
        right: right ? rightValue : "",
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
