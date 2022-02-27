import { useState, useEffect } from 'react'

import './XAxisAnimation.scss'


const XAxisAnimation = ({ right, animationValues, children }) => {

    const rightBlock = right ? "rightPosition" : "";
    const smallMotion = animationValues.smallMotion ? "smallMotion" : "";
    const xAnimation = animationValues.XAxis ? animationValues.XAxis : "";
    const animDuration  = animationValues.duration ? animationValues.duration : "";

    return (
        <div className={`XAxisAnimation ${xAnimation} ${animDuration} ${rightBlock} ${smallMotion}`} >
            { children }
        </div>
    );


}

export default XAxisAnimation;