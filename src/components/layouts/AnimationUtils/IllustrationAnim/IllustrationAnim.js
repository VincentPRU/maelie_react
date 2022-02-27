import React from 'react'

import XAxisAnimation from '../XAxisAnimation/XAxisAnimation'
import YAxisAnimation from '../YAxisAnimation/YAxisAnimation'


import styles from './IllustrationAnim.module.scss'




const IllustrationAnim = ({ right, animation, children }) => {

    const animDurationClass = animation.duration ? styles[animation.duration] : "";
    const animSmallMotionClass = animation.smallMotion ? styles.smallMotion : "";

    return (
        <div className={` ${styles.IllustrationAnim} ${ animDurationClass } ${animSmallMotionClass}`} >
             <XAxisAnimation right={right} animationValues={animation}>
                 <YAxisAnimation animationValues={animation}>
                    { children }
                 </YAxisAnimation>
             </XAxisAnimation>
        </div>
    );


}

export default IllustrationAnim;