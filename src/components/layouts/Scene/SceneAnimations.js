import React, { useState, useEffect } from 'react'

import IllustrationAnim from '../AnimationUtils/IllustrationAnim/IllustrationAnim'

import Maelie from '../../currentIllustrations/Maelie/Maelie'
import Dragon from '../../currentIllustrations/Dragon/Dragon'
import Knight from '../../currentIllustrations/Knight/Knight'
import Villager from '../../currentIllustrations/Villager/Villager'


import styles from './SceneAnimations.module.scss'

import animationData from './ScenesAnimationsDetails.json'


const SceneAnimations = ({ scene }) => {

    const [currentScene, setCurrentScene] = useState(animationData[0]);

    useEffect(() => {
        if(scene){
            setCurrentScene(animationData[parseInt(scene)]);
        }
    }, [scene])


    return (

        <div className={ styles.sceneAnimationsComponent }>

            {/* Left section */}
            <div>
                <IllustrationAnim right animation={currentScene.Dragon}>
                    <Dragon height="75vh" hypnotizable leftAlign throwFlames attack={currentScene.Dragon.attack} gotHypnotized={currentScene.Dragon.hypnotized} />
                </IllustrationAnim>
                <IllustrationAnim right animation={currentScene.VillagersLeft}>
                    {/* Leftoffset is negative to avoid overlaping */}
                    <Villager height="45vh" leftOffSet="-20vh" reverse color="blue" notes notesPlaying={currentScene.VillagersLeft.active} noteDelay="noteDelay5000"/>
                    <Villager height="45vh" leftOffSet="0vh" reverse color="green" notes notesPlaying={currentScene.VillagersLeft.active}  />
                    <Villager height="45vh" leftOffSet="-12vh" layerPos={1.1} layerTop="7vh" reverse />
                </IllustrationAnim>
            </div>

            {/* Right section  updateScene(1) */}
            <div>

                    <IllustrationAnim animation={currentScene.Maelie}>
                        <Maelie left="0vh" height="40vh" top="0vh" minHeight="10" singing={currentScene.Maelie.singing} higher={currentScene.Maelie.higher} />
                    </IllustrationAnim>
                    <IllustrationAnim animation={currentScene.Knight}>
                        <Knight height="45vh" dyingMode={currentScene.Knight.dyingMode} rightAlign fightingMode={currentScene.Knight.fightingMode} animDelay={currentScene.Knight.duration}/>
                    </IllustrationAnim>
                    <IllustrationAnim animation={currentScene.Villager}>
                        <Villager height="45vh" spear attack={currentScene.Villager.attack}  spearPos="low" active={currentScene.Villager.active} killed={currentScene.Villager.dying}/>
                        <Villager height="45vh" color="green" leftOffSet="13vh"  animationDelay="protestDelay06" active={currentScene.Villager.active} protesting killed={currentScene.Villager.dying} />
                        <Villager height="45vh" color="blue" leftOffSet="25vh" layerTop="-1vh" angry killed={currentScene.Villager.dying} />
                        <Villager height="45vh" color="blue" leftOffSet="42vh"  active={currentScene.Villager.active} protesting angry killed={currentScene.Villager.dying} />

                        <Villager height="45vh" color="blue" leftOffSet="6vh" layerPos={1.1} layerTop="4vh" angry killed={currentScene.Villager.dying} />
                        <Villager height="45vh" leftOffSet="38vh" layerPos={1.1} layerTop="5vh" killed={currentScene.Villager.dying} />
                        <Villager height="45vh" color="green" leftOffSet="23vh" layerPos={1.14} layerTop="8vh" killed={currentScene.Villager.dying} />
                    </IllustrationAnim>
                    <IllustrationAnim animation={currentScene.VillagersRight}>
                        <Villager height="45vh" leftOffSet="5vh"/>
                        <Villager height="45vh" leftOffSet="25vh" color="green" layerPos={1.05} layerTop="3vh" notes notesPlaying={currentScene.VillagersRight.active} noteDelay="noteDelay2500"  />
                        <Villager height="45vh" leftOffSet="11vh" layerPos={1.15} layerTop="9vh" color="blue" />
                    </IllustrationAnim>
            </div>

        </div>

    );


}


export default SceneAnimations;