import React, { useRef } from 'react';


//page styling
import styles from './Home.module.scss'

import OverflowImagesContainer from '../../../components/layouts/OverflowImagesContainer/OverflowImagesContainer'

//Illustrations components 
import Tree from '../../../components/currentIllustrations/Tree/Tree'
import Hill from '../../../components/currentIllustrations/Hill/Hill'
import House from '../../../components/currentIllustrations/House/House'

//Scene component
import Scene from '../../../components/layouts/Scene/Scene'

//Poster component
import Poster from '../../../components/layouts/Poster/Poster'

//button component
import Button from '../../../components/Button/Button'

//Illustrations import to save space below
import castle from '../../../images/illustrations/chateau.png'
import knight from '../../../images/illustrations/chevalier.png'
import hill1 from '../../../images/illustrations/colline1.png'
import hill2 from '../../../images/illustrations/colline2.png'
import angryDragon from '../../../images/illustrations/dragon_fache.png'
import hypDragon from '../../../images/illustrations/dragon_hyp.png'
import flame from '../../../images/illustrations/flamme.png'
import fork from '../../../images/illustrations/fourche.png'
import maelieSinging from '../../../images/illustrations/Maelie_chant.png'
import maelie from '../../../images/illustrations/Maelie.png'
import house200px from '../../../images/illustrations/maison_200.png'
import house400px from '../../../images/illustrations/maison_400.png'

//import context for the scroll event
import { ScrollEventProvider } from '../../../contexts/ScrollEvent'



const Home = () => {

    const sceneSection = useRef({});

    

    return (
        <ScrollEventProvider>
            <div className={`${styles.homePage} col-12`}>

                   <div className={`fade-Intro fade-Intro--In ${styles.skyBackgroundGradient}`}>
                        <div></div> 
                        <div></div>
                    </div>

                    <section className={`${styles.sectionContainer} col-12`}>

                        {/* Visual */}
                        <OverflowImagesContainer left="50%" width="100%" yTransformFactor="0.3" top="0.5">
                            <Hill img={ hill2 } left="50%" top="0" width="175%" />

                            {/* Top of the mountain */}

                            {/* house and Tree model : 
                                fileSize = 400 || 200, 
                                top: fraction of the parent width, 
                                left: percentage of the parent width,
                                height: percentage of the niewport height
                                minHeight: value in Rem unit
                            */}
                            <House fileSize={200} top="0.02" left="79%" height="15vh" minHeight="5"/>
                            <Tree top="0.03" left="83%" height="19vh" minHeight="6" background/>
                            <Tree top="0.04" left="86%" height="17vh"minHeight="5" />
                            <Tree top="0.05" left="70%" height="14vh" minHeight="5" reverse/>

                            {/* Right section */}
                            <House fileSize={200} top="0.3" left="25%" height="14vh" minHeight="4"/>
                            <Tree top="0.315" left="16%" height="13vh" minHeight="5" blurBackground/>
                            <House fileSize={200} top="0.299" left="20%" height="11vh" minHeight="4" background/>
                            <Tree top="0.293" left="31%" height="16vh" minHeight="5"  reverse/>
                            <Tree top="0.37" left="12%" height="17vh" minHeight="5" reverse/>
                            
                            <Tree top="0.23" left="65%" height="16vh" minHeight="5" />
                            <Tree top="0.29" left="70%" height="13vh" minHeight="5" reverse/>

                            <Tree top="0.5" left="80%" height="16vh" minHeight="5" />
                            <Tree top="0.51" left="90%" height="13vh" minHeight="5" reverse/>
                            <Tree top="0.57" left="84%" height="16vh" minHeight="5" />
{/* 
                            <div style={{ width: "100%", borderTop: "1px solid red", position: "absolute", top: "5vh"}}></div>
                            <div style={{ width: "1px", height:"100%",  borderLeft: "1px solid green", position: "absolute", left: "80%"}}></div>
*/}
                        </OverflowImagesContainer>

                        {/* Main content of the section */}
                        <article className={`${styles.sectionContent} col-12`}>
                            <header  className={`col-12`}>
                                <div className={`col-12 fade-Intro fade-Intro--In fade-Intro--dur-1000 fade-Intro--delay-750`}>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123.15 34.2">
                                            <path d="M82.51,32.79a8.61,8.61,0,0,1-1.67,0h0c-4.74-1-7-5.95-7-14.58S76.31,4.69,81,3.68a6.19,6.19,0,0,1,1.72,0c3.11.86,5.35,3.17,7.82,5.51l0-5.11a30.18,30.18,0,0,0-7.85-1H81.12c-8.21.33-16,6.43-16,15.19,0,9,6,14.86,15.75,15.19h0c.39,0,1.33,0,1.58,0h0a35.35,35.35,0,0,0,8.3-1V27.25c-2.1,2.05-6.3,5.11-8.21,5.54" transform="translate(-1.93 -3.02)"/>
                                            <path d="M15.71,14.91l-2.49-1.26c-3.89-2-5.06-2.91-5.06-5.77,0-2.62,1.85-3.86,4-4.22,3.11-.32,6.28,2.59,8.2,4.6V3.85A52.81,52.81,0,0,0,14,3.05c-.62,0-.86,0-1.33,0C7.32,3.13,1.93,6.66,1.93,12.48c0,4.17,2.72,6.65,6.18,8.43l3,1.46c3.28,1.68,4.69,2.57,4.69,5.29,0,3.38-2.71,5.16-5.65,5.16s-6-2.72-8.18-5.25v4.92a36.41,36.41,0,0,0,7.45.94H11c6.28-.33,11.12-4.09,11.12-9.95,0-5.11-3.14-6.84-6.42-8.58" transform="translate(-1.93 -3.02)" />
                                            <path d="M125.07,18.24A15,15,0,0,0,110.45,3.05a14.81,14.81,0,0,0-1.64,0h0A15,15,0,0,0,94.23,18.24a15,15,0,0,0,13.31,15.08,109.65,109.65,0,0,0,15.35,3.9l.17-4.94c-2.85.28-5.86.57-11,1a15,15,0,0,0,13-15m-22.12,0c0-7.69,1.45-14,5.86-14.58.48,0,1.64,0,1.64,0,4.59.61,5.86,6.85,5.86,14.58s-1.27,14-5.86,14.58h0a13.85,13.85,0,0,1-1.64,0c-4.41-.61-5.86-6.89-5.86-14.58" transform="translate(-1.93 -3.02)"/>
                                            <path d="M61.81,3.49H51v0h0L44.35,22.14,35.54,3.49H27.08l2.16,4.62v17.5c-1.39,3-2,4.28-3.71,7.41h4.86V10.59L41.05,33.4h.51L42.77,30h0L51.11,6.62V33h8.54V8.09c1-2.09,1.27-2.73,2.16-4.6" transform="translate(-1.93 -3.02)" />
                                        </svg>
                                    </div>
                                    <Button color="blue" scrollTo={sceneSection}>Visualiser le conte</Button>
                                </div>
                                <div className={`${styles.titleContainer}`}>
                                    <h1 className={`red col-12 fade-Intro fade-Intro--In-Up  fade-Intro--delay-250`}>Maelie et le dragon</h1>
                                    <h3 className={`blue col-12 fade-Intro fade-Intro--In-Up  fade-Intro--delay-500`}>Un conte musical collaboratif</h3>
                                </div>
                            </header>

                            <section className={`col-12 ${styles.posterContainer}`}>
                                <div className="maxWidthPageContainer">
                                    <Poster
                                        top={25}
                                        img={maelie}
                                        alt="Illustration de Maelie, personnage principal du conte."
                                        header2="L'origine du conte"
                                        paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus eu ante sodales tempus. Proin ex lectus, aliquet at arcu ut, gravida facilisis quam. Ut erat sem, imperdiet rhoncus."
                                        floatRight={true}
                                    />
                                </div>
                            </section>

                        </article>


                        {/* New sub-section */}
                        <section className={`${styles.sectionContainer} col-12`}>

                            {/* Visuals */}
                            <OverflowImagesContainer left="50%" width="100%" yTransformFactor="0.2">
                                <Hill img={ hill2 } left="60%" reverse={true} width="185%" />

                                <Tree top="0.31" left="30%" height="13vh" minHeight="5" reverse/>
                                <Tree top="0.47" left="38%" height="16vh" minHeight="5" />
                            </OverflowImagesContainer>

                            {/* Main content of the section */}
                            <article className={`${styles.sectionContent} col-12`}>
                                <section className={`col-12 ${styles.posterContainer}`}>
                                    <div className="maxWidthPageContainer">
                                    <Poster
                                        top={50}
                                        img={maelie}
                                        alt="Illustration de Maelie, personnage principal du conte."
                                        header2="Vous aimeriez participer à la bande sonore ?"
                                        paragraph="Les deux choix affichiés ci-dessous s'offrent à vous :"
                                    />
                                    </div>
                                </section>
                            </article>

                            {/* New sub-section */}
                            <section className={`${styles.sectionContainer} col-12`}>

                                {/* Visual */}
                                <OverflowImagesContainer left="50%" width="100%" yTransformFactor="0.1" >
                                    <Hill img={ hill2 } left="50%" width="175%" />

                                    {/* Top of the hill (third one) */}
                                    <House fileSize={200} top="0.017" left="79%" height="13vh" minHeight="5"/>
                                    <House fileSize={200} top="0.04" left="73%" height="15vh" minHeight="5"/>
                                    <Tree top="0.06" left="67%" height="15vh" minHeight="4" reverse blurBackground/>
                                    <Tree top="0.037" left="82.5%" height="14vh" minHeight="5" reverse />
                                    <Tree top="0.075" left="88.5%" height="17vh" minHeight="5" />

                                    {/* In the middle trees */}
                                    <Tree top="0.25" left="55%" height="17vh" minHeight="5" />
                                    <Tree top="0.35" left="47%"  height="17vh" minHeight="5" reverse/>
                                </OverflowImagesContainer>

                                {/* Main content of the section */}
                                <article className={`${styles.sectionContent} col-12`}>
                                    <section className={`col-12 ${styles.posterContainer}`}>
                                        <div className="maxWidthPageContainer">
                                            <section className={`col-12 ${styles.multiPosterContainer}`}>
                                                <Poster
                                                    top={65}
                                                    bottom={20}
                                                    img={maelie}
                                                    alt="Illustration de Maelie, personnage principal du conte."
                                                    header2="L'origine du conte"
                                                    paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus eu ante sodales tempus. Proin ex lectus, aliquet at arcu ut, gravida facilisis quam. Ut erat sem, imperdiet rhoncus."
                                                />
                                                <Poster
                                                    top={40}
                                                    img={house200px}
                                                    alt="Illustration de Maelie, personnage principal du conte."
                                                    header2="L'origine du conte"
                                                    paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus eu ante sodales tempus. Proin ex lectus, aliquet at arcu ut, gravida facilisis quam. Ut erat sem, imperdiet rhoncus."
                                                    floatRight={true}
                                                />
                                         </section>
                                        </div>

                                    </section>
                                </article>
                                {/* New sub-section */}
                                <section ref={ sceneSection } style={{height: "100vh"}} className={`${styles.sectionContainer} col-12`}>

                                    <Scene/>

                                </section>
                            </section>
                        </section>
                    </section>


                
            </div>
        </ScrollEventProvider>
    );
}

export default Home;