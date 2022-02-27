import React from 'react'

import XAxisAnimation from '../XAxisAnimation/XAxisAnimation'
import YAxisAnimation from '../YAxisAnimation/YAxisAnimation'


import styles from './IllustrationAnim.module.scss'




const IllustrationAnim = ({ animation, children }) => {



    return (
        <div className={ styles.IllustrationAnim } >
             <XAxisAnimation xAxisAnimation={animation}>
                 <YAxisAnimation animationValues={animation}>
                    { children }
                 </YAxisAnimation>
             </XAxisAnimation>
        </div>
    );


}

export default IllustrationAnim;