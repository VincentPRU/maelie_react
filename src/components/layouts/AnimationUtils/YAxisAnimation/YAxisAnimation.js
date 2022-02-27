import { useState, useEffect } from 'react'

import './YAxisAnimation.scss'


const YAxisAnimation = ({ animationValues, children, rightBlock }) => {


    
    //percentage is going to represent the right key frame
    //while x axis animation is going to call a class to change the variable
    const yAxis = animationValues.YAxis ? animationValues.YAxis : "";
    const yPercentage = animationValues.YPercentage ? animationValues.YPercentage : "";
    const yDuration = animationValues.duration ? animationValues.duration : "";
    


    return (
        <div className={`YAxisAnimation ${yAxis} ${yPercentage} ${yDuration}`} >
            { children }
        </div>
    );


}

export default YAxisAnimation;