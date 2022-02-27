import React from 'react'


import styles from './Floor.module.scss'

import img from '../../../images/illustrations/Sol.png'

const Floor = ({ left, top, parentwidth, minHeight, height, viewportHeightRelative}) => {

    //Top position is going to be relative to the parent element width
    const topPos = viewportHeightRelative ? parseFloat(top) + "vh" : (parseFloat(top) * parentwidth) + 'px';

    //Min height, if declared, to prevent objects from been to smalls
    //**IMP** The unit is rem
    const minimumHeight = minHeight ? (parseFloat(minHeight) + "rem") : "4rem";

    const style = {
        top: topPos,
        left: viewportHeightRelative ? parseFloat(left) + "vh" : left,
        height: height,
        minHeight: minimumHeight
    }

    return (
        <>
            <img 
                style={style} 
                className={`${styles.floorComponent}`} 
                alt="Illustration d'un château" 
                src={ img } 
            />
        </>
    );
}

export default Floor