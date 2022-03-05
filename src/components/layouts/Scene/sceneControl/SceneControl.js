import { useEffect, useState, useRef } from 'react'

import styles from './SceneControl.module.scss'


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



const SceneControl = ({setAnimation, currentAnimation}) => {

    const [animationPlaying, setAnimationPlaying] = useState(false);
    const [menuSectionState, setMenuSectionState] = useState(true);
    const [constrolSectionState, setControlSectionState] = useState(false);

    const [currentText, setCurrentText] = useState("");

    const textRef = useRef("")

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

        <section className={styles.sceneControlComponent}>

            { constrolSectionState &&
          
            <div className={styles.controlsSection}>

                <div className={styles.topMenuContainer}>

                    <div>
                        <div ref={ timeRef }className={`${styles.timeRef} beige`}>00:00</div>
                        <div className={`${styles.loadingBar}`}>
                            <div ref={loadingBarRef} className={`${styles.blackBar}`}></div>
                            <div onClick={() => { timeJump(0) }} style={{left: "0%"}} className={`${styles.marking}`}>1</div>
                            <div onClick={() => { timeJump(0.11) }} style={{left: "10%"}}  className={`${styles.marking}`}>2</div>
                            <div onClick={() => { timeJump(0.26) }} style={{left: "24%"}}  className={`${styles.marking}`}>3</div>
                            <div onClick={() => { timeJump(0.48) }} style={{left: "46%"}}  className={`${styles.marking}`}>4</div>
                            <div onClick={() => { timeJump(0.64) }} style={{left: "63%"}}  className={`${styles.marking}`}>5</div>
                            <div onClick={() => { timeJump(0.84) }} style={{left: "82%"}}   className={`${styles.marking}`}>6</div>


                        </div>
                        <div className={`${styles.timeRef} beige`}>01.20</div>
                    </div>
                    <div>

                        <button onClick={() => { playButton() }} className={`${styles.playFunction} beige `}>
                            { animationPlaying ? "Pause" : "Jouer" }
                        </button>
                        <div></div>
                        <button onClick={reverseMenuStates} className={`${styles.menuFunction} beige`}>Menu</button>

                    </div>
                </div>
                <div></div>
                <div className={styles.bottomMenuContainer}>
                    <p>{ currentText}</p>
                </div>
            </div>
            }
            {menuSectionState &&
            <div className={styles.panelSection}>
                <Panel 
                    title="Conte musical" 
                    p1="Nous recueillons présentement les extraits musicaux dédiés à bâtir différentes trames sonores pour ce compte. Sous peu, celles-ci accompagneront l'histoire présentée ici-même."
                    p2="Jetez-y un coup d'œil et laisser-vous inspirer pour prendre part vous aussi à la bande sonore!"
                    action={reverseMenuStates}
                    buttonText="Visualiser le conte"
                />
            </div>
            }

            
        </section>
    );
}

export default SceneControl