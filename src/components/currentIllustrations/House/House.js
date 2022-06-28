import React, { memo } from 'react'

import styles from './House.module.scss'
import house200 from '../../../images/illustrations/maison_200.png'
import house400 from '../../../images/illustrations/maison_400.png'


const House = ( {fileSize, top, left, right, height, background, parentwidth, minHeight, reverse, viewportHeightRelative} ) => {

    //select the size of the house
    const house = fileSize === 200 ? house200 : house400;

    //Top position is going to be relative to the parent element width
    const topPos = viewportHeightRelative ? parseFloat(top) + "vh" : (parseFloat(top) * parentwidth) + 'px';

    //If position is relative to viewport Height, then the left position needs to be too
    const leftValue = viewportHeightRelative ? parseFloat(left) + "vh" : left;
    //If position is relative to viewport Height, then the left position needs to be too
    const rightValue = viewportHeightRelative ? parseFloat(right) + "vh" : right;

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "4rem";
    
    console.log("house")
    const style = {
        top: topPos,
        left: right ? "" : leftValue,
        right: right ? rightValue : "",
        height: height,
        minHeight: minimumHeight
    }

    return (
        <>
            <img style={style} className={`${styles.houseComponent} ${background ? styles.background : ""} ${reverse && styles.reverse}`} alt="Illustration de maison" src={ house } />
        </>
    );

}

export default House;

export const MemoizedHouse = memo(House)