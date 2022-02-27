import React, { lazy, Suspense, useState } from 'react'

import styles from './Scene.module.scss'

import OverflowImagesContainer from '../OverflowImagesContainer/OverflowImagesContainer'

//Illustrations png 
import hill1 from '../../../images/illustrations/colline1.png'
import hill2 from '../../../images/illustrations/colline2.png'


//Illustrations components
import Hill from '../../currentIllustrations/Hill/Hill'
import Dragon from '../../currentIllustrations/Dragon/Dragon'
import House from '../../currentIllustrations/House/House'
import Tree from '../../currentIllustrations/Tree/Tree'
import Castle from '../../currentIllustrations/Castle/Castle'
import Floor from '../../currentIllustrations/Floor/Floor'
import Maelie from '../../currentIllustrations/Maelie/Maelie'

import SceneAnimations from './SceneAnimations'

//import IllustrationAnim from '../AnimationUtils/IllustrationAnim/IllustrationAnim'

const Scene = () => {


    

    return (
        <div className={styles.sceneComponent}>
            {/* Visual */}
            <OverflowImagesContainer left="50%" width="100%" yTransformFactor="0" noBlurEffect={true} >

                <div style={{height: "80vh", top:"20vh"}} className={styles.whiteBackground}>d</div>

                <Floor top="49vh" left="118vh" height="8vh" minHeight="4" viewportHeightRelative />
                <Floor top="89vh" left="100vh" height="33vh" minHeight="4"viewportHeightRelative  />

                <Tree top="-16vh" left="28vh" height="10vh" minHeight="4" viewportHeightRelative reverse blurBackground />
                <Hill img={ hill1 } left="68vh" height="50vh" top="-20vh" />
                <Tree top="-12vh" left="21vh" height="13vh" minHeight="5" viewportHeightRelative reverse />
                <House fileSize={200} top="-17vh" left="35vh" height="9vh" minHeight="5" viewportHeightRelative reverse/>
                <Tree top="-15vh" left="40vh" height="12vh" minHeight="5" viewportHeightRelative />

                <Hill img={ hill1 } right="-110vh" height="40vh" top="-5vh" reverse/>
                <Tree right="10vh" top="2vh" height="19vh" minHeight="6" viewportHeightRelative reverse />
                <Tree right="1vh" top="9vh" height="18vh" minHeight="6" viewportHeightRelative />

                <Castle  top="17vh" right="50vh" height="35vh" minHeight="13" />
                <Hill img={ hill1 } right="35vh" height="35vh" top="5vh" reverse/>

                <Tree left="78vh" top="50vh" height="50vh" minHeight="20" viewportHeightRelative />
                <House fileSize={400} top="50vh" left="60vh" height="40vh" minHeight="13" viewportHeightRelative reverse/>
                <House fileSize={400} top="60vh" left="33vh" height="50vh" minHeight="15" viewportHeightRelative />
                <House fileSize={400} top="57vh" right="-10vh" height="45vh" minHeight="14" viewportHeightRelative />

            </OverflowImagesContainer>
          
            <SceneAnimations/>

            

        </div>
    );

}


export default Scene