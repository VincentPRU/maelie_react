import React, { useState } from 'react'

import IllustrationAnim from '../AnimationUtils/IllustrationAnim/IllustrationAnim'

import Maelie from '../../currentIllustrations/Maelie/Maelie'
import Dragon from '../../currentIllustrations/Dragon/Dragon'
import Knight from '../../currentIllustrations/Knight/Knight'
import Villager from '../../currentIllustrations/Villager/Villager'


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
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", cursor: "pointer", zIndex: 100 }} onClick={ () => updateScene(0) }>Scène 1</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer", zIndex: 100 }} onClick={ () => updateScene(1) }>Scène 2</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer",zIndex: 100 }} onClick={ () => updateScene(2) }>Scène 3</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer",zIndex: 100 }} onClick={ () => updateScene(3) }>Scène 4</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer" ,zIndex: 100}} onClick={ () => updateScene(4) }>ATTAQUE!!</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer", zIndex: 100 }} onClick={ () => updateScene(5) }>Scène 6</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer", zIndex: 100 }} onClick={ () => updateScene(6) }>Scène 7</div>
                <div style={{ position: "relative", backgroundColor: "white", padding: "1rem", marginTop: "0.5rem", cursor: "pointer", zIndex: 100 }} onClick={ () => updateScene(7) }>Scène 8</div>


                    </div>
                    <IllustrationAnim animation={currentScene.Maelie}>
                        <Maelie left="0vh" height="40vh" top="0vh" minHeight="10" />
                    </IllustrationAnim>
                    <IllustrationAnim animation={currentScene.Knight}>
                        <Knight height="45vh" dyingMode={currentScene.Knight.dyingMode} rightAlign fightingMode={currentScene.Knight.fightingMode} animDelay={currentScene.Knight.duration}/>
                    </IllustrationAnim>
                    <IllustrationAnim animation={currentScene.Villager}>
                        <Villager height="45vh" spear attack={currentScene.Villager.attack} spearAttacking spearPos="low" active={currentScene.Villager.active} killed={currentScene.Villager.dying}/>
                        <Villager height="45vh" color="green" leftOffSet="13vh"  animationDelay="protestDelay06" active={currentScene.Villager.active} protesting killed={currentScene.Villager.dying} />
                        <Villager height="45vh" color="blue" leftOffSet="25vh" layerTop="-1vh" angry killed={currentScene.Villager.dying} />
                        <Villager height="45vh" color="blue" leftOffSet="42vh"  active={currentScene.Villager.active} protesting angry killed={currentScene.Villager.dying} />

                        <Villager height="45vh" color="blue" leftOffSet="6vh" layerPos={1.1} layerTop="4vh" angry killed={currentScene.Villager.dying} />
                        <Villager height="45vh" leftOffSet="38vh" layerPos={1.1} layerTop="5vh" killed={currentScene.Villager.dying} />
                        <Villager height="45vh" color="green" leftOffSet="23vh" layerPos={1.14} layerTop="8vh" killed={currentScene.Villager.dying} />
                    </IllustrationAnim>
            </div>

        </div>

    );


}


export default SceneAnimations;