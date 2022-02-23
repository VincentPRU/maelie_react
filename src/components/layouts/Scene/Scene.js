import React from 'react'

import styles from './Scene.module.scss'

import OverflowImagesContainer from '../../layouts/OverflowImagesContainer/OverflowImagesContainer'

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

const Scene = () => {



    return (
        <div className={styles.sceneComponent}>
            {/* Visual */}
            <OverflowImagesContainer left="50%" width="100%" yTransformFactor="0" noBlurEffect={true} >

                <div style={{height: "80vh", top:"20vh"}} className={styles.whiteBackground}>d</div>

                <Floor top="0.259" left="63%" height="7vh" minHeight="4" />
                <Floor top="0.45" left="50%" height="33vh" minHeight="4" />

                <Tree top="-0.08" left="10%" height="10vh" minHeight="4" reverse blurBackground />
                <Hill img={ hill1 } left="30%" width="100%" top={-0.1}/>
                <Tree top="-0.05" left="7%" height="13vh" minHeight="5" reverse />
                <House fileSize={200} top="-0.09" left="14%" height="9vh" minHeight="5" reverse/>
                <Tree top="-0.08" left="17%" height="12vh" minHeight="5" />

                <Hill img={ hill1 } left="80%" width="80%" top={-0.01} reverse/>
                <Tree top="0.03" left="90%" height="18vh" minHeight="7" reverse />
                <Tree top="0.06" left="94%" height="17vh" minHeight="7" />

                <Castle  top="0.095" left="65%" height="40vh" minHeight="13" />
                <Hill img={ hill1 } left="10%" width="80%" top={0.02} reverse/>

                <Tree top="0.27" left="40%" height="50vh" minHeight="20" />
                <House fileSize={400} top="0.27" left="30%" height="40vh" minHeight="13" reverse/>
                <House fileSize={400} top="0.32" left="15%" height="55vh" minHeight="15"/>
                <House fileSize={400} top="0.30" left="85%" height="50vh" minHeight="14"/>


            </OverflowImagesContainer>

        </div>
    );

}


export default Scene