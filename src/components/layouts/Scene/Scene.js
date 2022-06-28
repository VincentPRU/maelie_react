import { useState } from 'react'

import styles from './Scene.module.scss'

import OverflowImagesContainer from '../OverflowImagesContainer/OverflowImagesContainer'
import SceneControl from './sceneControl/SceneControl'


//Illustrations components
import { MemoizedHill as Hill} from '../../currentIllustrations/Hill/Hill'
import { MemoizedHouse as House } from '../../currentIllustrations/House/House'
import { MemoizedTree as Tree } from '../../currentIllustrations/Tree/Tree'
import Castle from '../../currentIllustrations/Castle/Castle'
import Floor from '../../currentIllustrations/Floor/Floor'

import SceneAnimations from './SceneAnimations'

//import IllustrationAnim from '../AnimationUtils/IllustrationAnim/IllustrationAnim'
const Scene = ({sceneSection}) => {

    const [currentAnimation, setCurrentAnimation] = useState(0);

    return (
        <div className={styles.sceneComponent}>
            {/* Visual */}
            <OverflowImagesContainer left="50%" width="100%" yTransformFactor="0" noBlurEffect={true} >

                <div style={{height: "80vh", top:"20vh"}} className={styles.whiteBackground}>d</div>

                <Floor top="54vh" left="118vh" height="8vh" minHeight="4" viewportHeightRelative />
                <Floor top="96vh" left="100vh" height="33vh" minHeight="4"viewportHeightRelative  />

                <Tree top="-10vh" left="28vh" height="10vh" minHeight="4" viewportHeightRelative reverse background />
                <Hill smallHill left="68vh" height="50vh" top="-14vh" />
                <Tree top="-6vh" left="21vh" height="13vh" minHeight="5" viewportHeightRelative reverse />
                <House fileSize={200} top="-11vh" left="35vh" height="9vh" minHeight="5" viewportHeightRelative reverse/>
                <Tree top="-9vh" left="40vh" height="12vh" minHeight="5" viewportHeightRelative />

                <Hill smallHill right="-110vh" height="40vh" top="1vh" reverse/>
                <Tree right="10vh" top="8vh" height="19vh" minHeight="6" viewportHeightRelative reverse />
                <Tree right="1vh" top="15vh" height="18vh" minHeight="6" viewportHeightRelative />

                <Castle  top="23vh" right="50vh" height="35vh" minHeight="13" />
                <Hill smallHill right="35vh" height="35vh" top="11vh" reverse/>

                <Tree left="78vh" top="57vh" height="50vh" minHeight="20" viewportHeightRelative />
                <House fileSize={400} top="57vh" left="60vh" height="40vh" minHeight="13" viewportHeightRelative reverse/>
                <House fileSize={400} top="65vh" right="-10vh" height="45vh" minHeight="14" viewportHeightRelative />
                <House fileSize={400} top="67vh" left="33vh" height="50vh" minHeight="15" viewportHeightRelative />


            </OverflowImagesContainer>
          
            <SceneAnimations scene={currentAnimation}/>
            <SceneControl  sceneSection={sceneSection} currentAnimation={currentAnimation} setAnimation={setCurrentAnimation} />

        </div>
    );

}


export default Scene