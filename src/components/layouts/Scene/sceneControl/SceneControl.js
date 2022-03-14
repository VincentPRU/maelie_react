import { useEffect, useState, useRef } from 'react'

import styles from './SceneControl.module.scss'

import Tooltip from '../../Tooltip/Tooltip'
import Panel from '../../Panel/Panel'

const convertToTime = ( secs ) => {
        var sec_num = parseInt(secs, 10)
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
    
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
}  

const setAnimationsPerTime = (time, totalTime, currentScene, setCurrentScene) => {
    const percentage = parseInt((time * 100) / totalTime);
    const scene = currentScene.toString();
   
    if(percentage < 21 && percentage > 11) {
        if(scene !== "1") setCurrentScene("1")
        return
    }
    if(percentage >= 26 && percentage < 31) {
        if(scene !== "2") setCurrentScene("2")
        return
    }
    if(percentage >= 31 && percentage < 39) {
        if(scene !== "3") setCurrentScene("3")
        return
    }
    if(percentage >= 39 && percentage < 47) {
        if(scene !== "4") setCurrentScene("4")
        return
    }
    if(percentage >= 47 && percentage < 53) {
        if(scene !== "5") setCurrentScene("5")
        return
    }
    if(percentage >= 53 && percentage < 64) {
        if(scene !== "6") setCurrentScene("6")
        return
    }
    if(percentage >= 64 && percentage < 73) {
        if(scene !== "7") setCurrentScene("7")
        return
    }
    if(percentage >= 73 && percentage < 85) {
        if(scene !== "8") setCurrentScene("8")
        return
    }
    if(percentage >= 85) {
        if(scene !== "9") setCurrentScene("9")
        return
    }
    


    if(scene !== "0") setCurrentScene("0")
}


const setTextPerTime = (time, totalTime, currentText, setCurrentText) => {
    const percentage = parseInt((time * 100) / totalTime);
    let condition = true;

    if(percentage > 1 && percentage < 10 && condition) {
        console.log("inside")

        condition = false;

        if(currentText !== "Il était une fois un village où tout le monde détestait la musique,"){
            setCurrentText("Il était une fois un village où tout le monde détestait la musique,");
        } 
    } else {

        if(percentage > 13 && percentage < 20 && condition) {
            condition = false;
            if(currentText !== "sauf Maélie, une petite fille."){
                setCurrentText("sauf Maélie, une petite fille.");
            } 
        } else {

            if(percentage > 24 && percentage < 32 && condition) {
                condition = false;
                if(currentText !== "Un jour, un dragon arriva."){
                    setCurrentText("Un jour, un dragon arriva.");
                } 
            } else {

                if(percentage >= 33 && percentage < 48 && condition) {
                    condition = false;
                    if(currentText !== "Le chevalier le plus fort essaya de le combattre, mais il mourut au combat."){
                        setCurrentText("Le chevalier le plus fort essaya de le combattre, mais il mourut au combat.");
                    } 
                } else {

                    if(percentage >= 48 && percentage < 60 && condition) {
                        condition = false;
                        if(currentText !== "D’autres villageois essayèrent à leur tour, mais sans y parvenir."){
                            setCurrentText("D’autres villageois essayèrent à leur tour, mais sans y parvenir.");
                        } 
                    } else {
                        if(percentage >= 67 && percentage < 73 && condition) {
                            condition = false;
                            if(currentText !== "Soudain, Maélie se trouva face à face avec le fameux dragon. Elle décida de chanter sa chanson préférée avant de mourir."){
                                setCurrentText("Soudain, Maélie se trouva face à face avec le fameux dragon. Elle décida de chanter sa chanson préférée avant de mourir.");
                            } 
                        } else {
                            if(percentage >= 78 && percentage < 85 && condition) {
                                condition = false;
                                if(currentText !== "La musique hypnotisa le dragon qui retourna chez lui."){
                                    setCurrentText("La musique hypnotisa le dragon qui retourna chez lui.");
                                } 
                            } else {
                                if(percentage >= 90 && percentage <= 100 && condition) {
                                    condition = false;
                                    if(currentText !== "Depuis ce jour, tous les villageois adorent la musique et fredonnent la chanson préférée de Maélie."){
                                        setCurrentText("Depuis ce jour, tous les villageois adorent la musique et fredonnent la chanson préférée de Maélie.");
                                    } 
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    

    if(currentText !== " " && condition){
        setCurrentText(" ");
    };
}

const scrollToElement = element => {
    window.scrollTo(
        {top: parseInt(element.current.getBoundingClientRect().top + (window.pageYOffset || 0)),
         left: 0,
         behavior: 'smooth'
        })
}

const SceneControl = ({setAnimation, currentAnimation}) => {

    const [animationPlaying, setAnimationPlaying] = useState(false);
    const [menuSectionState, setMenuSectionState] = useState(true);
    const [constrolSectionState, setControlSectionState] = useState(false);

    const [currentText, setCurrentText] = useState("");

    const controlSection = useRef();

    const loadingBarRef = useRef();
    const totalTime = 80;
    const timeRef = useRef();

    const currentTime = useRef(0);    

    useEffect(() => {
        if(animationPlaying){

                const interval = setInterval(() => {
                    currentTime.current += 1;
                    loadingBarRef.current.style.width = (currentTime.current * 100) / totalTime + "%";
                    timeRef.current.innerText = convertToTime(currentTime.current);
                    if (currentTime.current >= totalTime) {
                        clearInterval(interval)
                        currentTime.current = 0;
                        setAnimationPlaying(false);
                    };
                    setAnimationsPerTime(currentTime.current, totalTime, currentAnimation, setAnimation)
                    setTextPerTime(currentTime.current, totalTime, currentText, setCurrentText);

                }, 1000);
                
       

                return () => clearInterval(interval);
            
    

        }


    }, [animationPlaying, currentAnimation, setAnimation])


    const timeJump = ( percnetage ) => {
        currentTime.current = (parseInt(percnetage * totalTime))
        loadingBarRef.current.style.width = (currentTime.current * 100) / totalTime + "%";
        timeRef.current.innerText = convertToTime(currentTime.current);
    }


    const playButton = () => {
        if(animationPlaying){
            setAnimationPlaying(false);
        } else {
            setAnimationPlaying(true);
        }
    }

    const reverseMenuStates = () => {
        if(currentTime.current !== 0){ 
            timeJump(0) 
        
            setAnimationsPerTime(0, totalTime, currentAnimation, setAnimation)
            setTextPerTime(0, totalTime, currentText, setCurrentText);
        }

        if(menuSectionState){
            setMenuSectionState(false);
            setControlSectionState(true);
        } else {
            setMenuSectionState(true);
            setControlSectionState(false);
        }
    }

    





    return (

        <section className={styles.sceneControlComponent} ref={ controlSection }>

            { constrolSectionState &&
           
            <div className={`${styles.controlsSection}`} >

                <div className={`${styles.topMenuContainer} ${constrolSectionState && styles.setVisible}`}>

                    <div>
                        <div className={`${styles.loadingBar}`}>
                            <div ref={loadingBarRef} className={`${styles.blackBar}`}></div>
                            <div onClick={() => { timeJump(0) }} style={{left: "0%"}} className={`${styles.marking}`}>1
                                <Tooltip color="pink">Scène 1</Tooltip>
                            </div>
                            <div onClick={() => { timeJump(0.11) }} style={{left: "10%"}} className={`${styles.marking}`}>2
                                <Tooltip color="pink">Scène 2</Tooltip>
                            </div>
                            <div onClick={() => { timeJump(0.26) }} style={{left: "24%"}} className={`${styles.marking}`}>3
                                <Tooltip color="pink">Scène 3</Tooltip>
                            </div>
                            <div onClick={() => { timeJump(0.48) }} style={{left: "46%"}} className={`${styles.marking}`}>4
                                <Tooltip color="pink">Scène 4</Tooltip>
                            </div>
                            <div onClick={() => { timeJump(0.64) }} style={{left: "63%"}} className={`${styles.marking}`}>5
                                <Tooltip color="pink">Scène 5</Tooltip>
                            </div>
                            <div onClick={() => { timeJump(0.84) }} style={{left: "82%"}} className={`${styles.marking}`}>6
                                <Tooltip color="pink">Scène 6</Tooltip>
                            </div>

                        </div>
                    </div>
                    <div>

                        <div ref={ timeRef }className={`${styles.timeRef} beige`}>00:00</div>
                            <div className={styles.buttonsContainer}>
                                <button onClick={() => { playButton() }}>
                                    <div className={styles.svgContainer}>
                                        { animationPlaying ? 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 17"><line x1="10" y1="15.5" x2="10" y2="1.5" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="1.5" y1="15.5" x2="1.5" y2="1.5" fill="none"  strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>: 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 17"><path d="M6,2.8V15.2c0,.67,1,1,1.62.63l10-6.2a.7.7,0,0,0,0-1.26l-10-6.2C7,1.76,6,2.13,6,2.8Z" transform="translate(-4.5 -0.5)" fill="none"  strokeMiterlimit="10" strokeWidth="3"/></svg> 
                                        }
                                    </div>
                                    <div className={styles.textContainer}>
                                        { animationPlaying ? "Pause" : "Jouer" }
                                    </div>
                                </button>
                                <button onClick={ () => { scrollToElement(controlSection)
                                    }}>
                                    <div className={styles.svgContainer}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 17"><path d="M20.68,10.94v3.81a1.22,1.22,0,0,1-1.32,1.1H13.77" transform="translate(-0.18 -0.35)" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><path d="M13.77,1.85h5.59a1.22,1.22,0,0,1,1.32,1.09V6.77" transform="translate(-0.18 -0.35)" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><path d="M1.68,10.94v3.81A1.23,1.23,0,0,0,3,15.85H8.59" transform="translate(-0.18 -0.35)" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><path d="M8.59,1.85H3A1.23,1.23,0,0,0,1.68,2.94V6.77" transform="translate(-0.18 -0.35)" fill="none"  strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/></svg>
                                    </div>
                                    <div className={styles.textContainer}>
                                        Centrer
                                    </div>
                                </button>
                                <button onClick={reverseMenuStates}>
                                    <div className={styles.svgContainer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 15"><line x1="1.5" y1="1.5" x2="19.5" y2="1.5" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="1.5" y1="7.5" x2="19.5" y2="7.5" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/><line x1="1.5" y1="13.5" x2="19.5" y2="13.5" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/></svg>
                                    </div>
                                    <div className={styles.textContainer}>
                                        Menu
                                    </div>
                                </button>
                            </div>
                        <div className={`${styles.timeRef} beige`}>01.20</div>

                    </div>

                </div>
                <div></div>
                <div className={styles.bottomMenuContainer}>
                    <p>{currentText}</p>
                </div>
            </div>
            }
            {menuSectionState &&
            <div className={`${styles.panelSection} ${menuSectionState && styles.setVisible}`}>
                <Panel 
                    title="Conte musical" 
                    p1={`Clique ci-dessous pour visionner le conte de "Maélie et le dragon". Tu remarqueras qu'il manque un élément essentiel : la trame sonore !`}
                    p2="C'est normal, nous recueillons actuellement les fichiers audio envoyés par tous ceux qui veulent contribuer au projet. Sous peu, il sera possible d'entendre les différentes bandes sonores avec le conte illustré présenté ici-même."
                    p3="D'ici-là, jette un coup d'œil aux scènes et laisse-toi inspirer pour inventer ta propre bande sonore !"
                    action={reverseMenuStates}
                    buttonText="Visualiser le conte sans musique"
                />
            </div>
            }

            
        </section>
    );
}

export default SceneControl