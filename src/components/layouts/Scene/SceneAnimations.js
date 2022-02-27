import React, { useState } from 'react'

import IllustrationAnim from '../AnimationUtils/IllustrationAnim/IllustrationAnim'

import Maelie from '../../currentIllustrations/Maelie/Maelie'
import Dragon from '../../currentIllustrations/Dragon/Dragon'
import Knight from '../../currentIllustrations/Knight/Knight'


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
                <IllustrationAnim right animation={currentScene.Dragon}>
                    <Dragon height="75vh" leftAlign throwFlames attack={currentScene.Dragon.attack}  />
                </IllustrationAnim>



            </div>

            {/* Right section */}
            <div>
                <div style={{ position: "absolute", top: "0px", right: "0px"}}>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", cursor: "pointer" }} onClick={ () => updateScene(0) }>Scène 1</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" }} onClick={ () => updateScene(1) }>Scène 2</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" }} onClick={ () => updateScene(2) }>Scène 3</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" }} onClick={ () => updateScene(3) }>Scène 4</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" }} onClick={ () => updateScene(4) }>ATTAQUE!!</div>

                    </div>
                    <IllustrationAnim animation={currentScene.Maelie}>
                        <Maelie left="0vh" height="40vh" top="0vh" minHeight="10" />
                    </IllustrationAnim>
                    <IllustrationAnim animation={currentScene.Knight}>
                        <Knight height="45vh" dyingMode={currentScene.Knight.dyingMode} rightAlign fightingMode={currentScene.Knight.fightingMode} animDelay={currentScene.Knight.duration}/>
                    </IllustrationAnim>

            </div>

        </div>

    );


}


export default SceneAnimations;