import React, { useState } from 'react'

import IllustrationAnim from '../AnimationUtils/IllustrationAnim/IllustrationAnim'

import Maelie from '../../currentIllustrations/Maelie/Maelie'


import styles from './SceneAnimations.module.scss'

import animationData from './ScenesAnimationsDetails.json'


const SceneAnimations = () => {

    const [currentScene, setCurrentScene] = useState(animationData[0]);


    const updateScene = (index) => {
        setCurrentScene(animationData[index]);
        console.log(index)
    }

    return (

        <div className={ styles.sceneAnimationsComponent }>

            {/* Left section */}
            <div>


            </div>

            {/* Right section */}
            <div>
                <div style={{ position: "absolute", top: "0px", right: "0px"}}>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", cursor: "pointer" }} onClick={ () => updateScene(0) }>Scène 0</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" }} onClick={ () => updateScene(1) }>Scène 1</div>
                    </div>
                    <IllustrationAnim animation={currentScene.Maelie}>
                        <Maelie left="0vh" height="40vh" top="0vh" minHeight="10" />
                    </IllustrationAnim>

            </div>

        </div>

    );


}


export default SceneAnimations;