import { useEffect, useState, useRef } from 'react'

// Auth context 
import { useAuth } from '../../../../contexts/AuthContext';

//Components
import Button from '../../../Button/Button'
import Tooltip from '../../Tooltip/Tooltip'
import Panel from '../../Panel/Panel'
import Spinner from '../../../../utils/Spinner/Spinner'

//Animation text
import animationText from './sceneText.json'

//Db queries
import { getAllAudioScene, getRandomScenesMap } from './utils/scenesDbQueries'

//Animation functions
import { setTextPerTime } from './utils/animationTextFunctions'

//Audio class
import { AudioManager } from './utils/audioPlayer'


import styles from './SceneControl.module.scss'




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




const scrollToElement = element => {
    window.scrollTo(
        {top: parseInt(element.current.getBoundingClientRect().top + (window.pageYOffset || 0)),
         left: 0,
         behavior: 'smooth'
        })
}

const SceneControl = ({setAnimation, currentAnimation}) => {

    /* Auth context */
    const { currentUser } = useAuth();


    /*
        State loading data. To tell the user to wait until the data arrives
    */
    const [isLoading, setIsLoading] = useState(false)

    const [animationPlaying, setAnimationPlaying] = useState(false);
    const [menuSectionState, setMenuSectionState] = useState(true);
    const [constrolSectionState, setControlSectionState] = useState(false);

    /*
        Initial percentages values for playing without music.
        Could be eventualy stored else where
    */
    const initialPercentages = [0, 11, 26, 48, 64, 84]
    const [currentPercentages, setCurrentPercentages] = useState(initialPercentages); 

    /*
        State that holds api data in memory to prevent to many api request and time lost
    */
   const [scenesStoredData, setScenesStoredData] = useState();
   /*
    state to annone to the application if the animation is using music
   */
    const [animWithMusic, setAnimWithMusic] = useState(false)

    //initial value at 80 for the mode without sound
    const [totalTime, setTotalTime] = useState(80);

    //Update with the external function
    const [currentText, setCurrentText] = useState("");

    const controlSection = useRef();
    const loadingBarRef = useRef();
    const timeRef = useRef();
    const currentTime = useRef(0);  
    const audioManager = useRef(null)
    
    
    /*

        Main loop that analyse and update the animation

    */
    useEffect(() => {

        //Start the animation 
        /*
            Its gonna be running as long as we are in the animation visualisation mode, opposed to the menu
        */
        if(animationPlaying){

                const interval = setInterval(() => {

                    //Set the current time 
                    if(animWithMusic){
                        //if the animation use music
                        currentTime.current = audioManager.current.getCurrentTime()
                    } else {
                        //if the animation doesn't use music and run by itself
                        currentTime.current += 0.25; //plus one every second, or 0.2 every 200 ms
                    }

                    //ajust loading bar position
                    loadingBarRef.current.style.width = (currentTime.current * 100) / totalTime + "%";
                    //Ajust time display on the left
                    timeRef.current.innerText = convertToTime(currentTime.current);

                    if (currentTime.current >= totalTime) {
                        clearInterval(interval)
                        currentTime.current = 0;
                        setAnimationPlaying(false);
                    };

                    setAnimationsPerTime(currentTime.current, totalTime, currentAnimation, setAnimation)
                    //Get time and update the text in function of it
                    setTextPerTime(currentTime.current, totalTime, currentText, setCurrentText);

                }, 250);
                
                return () => clearInterval(interval);
        }


    }, [animationPlaying, currentAnimation, setAnimation, animWithMusic])


    const timeJump = ( percentage, newIndex ) => {
        console.log("time jump called")
        if(!animWithMusic){
            //if there is no music playing , we update the currenttime manually
            currentTime.current = (parseInt(percentage * totalTime / 100))
        } else {
            //Otherwise, we update the audio element that is playing and it is going to update itself in the animation loop
            audioManager.current.changeAudioElem( newIndex )
            currentTime.current = audioManager.current.getCurrentTime()
        }

        loadingBarRef.current.style.width = (currentTime.current * 100) / totalTime + "%";
        timeRef.current.innerText = convertToTime(currentTime.current);
    }

    //Start the animation loop
    const playButton = () => {
        if(animationPlaying){
            setAnimationPlaying(false);
            if(animWithMusic){
                audioManager.current.pause()
            }
    
        } else {
            setAnimationPlaying(true);
            if(animWithMusic){
                audioManager.current.play()
            }
        }
    }


    //Going from menu to animation state and vice versa
    const reverseMenuStates = () => {
        //Bring back the animation to 0 when alterning between animation and option modes
        if(currentTime.current !== 0){ 
            timeJump(0, 0) 
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

    /*
        function called when the animation is played without music
    */
   const launchAnimWithoutMusic = () => {

        //Set in the state the absence of music for this animation
        if(animWithMusic) setAnimWithMusic(false)

        //Display the animation menu
        reverseMenuStates()

   }


    /*
            Function called when the user choose the option to display the shuffle mode
    */
   const displayShuffledScenes = async () => {

        //Activate the spinner for the hole operation
        setIsLoading(true);

        //Set in the state that the animation need to be used with music
        if(!animWithMusic) setAnimWithMusic(true)

        //Exit the menu to only see the background until the spinner finish
        reverseMenuStates()

        //Fetch all the scenes information
        const scenes = await getAllAudioScene( scenesStoredData, setScenesStoredData);

        //Get a random selection of the scenes for the random mode
        const scenesMap = getRandomScenesMap(scenes)

        //Create an audio manager and activate it to store the audio elements
        audioManager.current = new AudioManager(scenesMap)

        //call the audio manager totaltime method to get the total duration, once all the meta data are loaded
        const newTotalTime = await audioManager.current.getTotalTime()

        //Update the percentages displayed in the top bar
        setCurrentPercentages(audioManager.current.audioElems.map(elem => elem.addedPercentage))

        //modify the total time in the component state
        setTotalTime(newTotalTime)

        //Stop the spinner
        setIsLoading(false)

    }


    /* 
        Event listener
   

   const keyPressEvent = (e) => {
        console.log("un")
        console.log(audioManager.current.currentAudioIndex)
        if(constrolSectionState && !isLoading){
            if (e.code === 'Space') {
                console.log("deux")
                playButton()
            }
        }
    }
    
    useEffect(() => {
        window.addEventListener('keyup', keyPressEvent)
        return () => window.removeEventListener('keyup', keyPressEvent);
    }, [keyPressEvent])



 */
    return (

        <section className={styles.sceneControlComponent} ref={ controlSection }>

            { constrolSectionState && isLoading && <Spinner/> }

            { constrolSectionState && !isLoading &&

            <div className={`${styles.controlsSection}`} >
            {/* Top menu */}
            <div style={{position: "fixed", top: "20px", right: "20px", zIndex: "1000"}}>
                <Button onClick={() => {audioManager.current.audioElems[audioManager.current.currentAudioIndex].audio.currentTime = audioManager.current.audioElems[audioManager.current.currentAudioIndex].duration * 0.95}}>Avancer à la fin</Button>
            </div>

                <div className={`${styles.topMenuContainer} ${constrolSectionState && styles.setVisible}`}>
                    
                    {/* Tome line notifications */}
                    <div>
                        <div className={`${styles.loadingBar}`}>
                            <div ref={loadingBarRef} className={`${styles.blackBar}`}></div>

                            {currentPercentages.map((percentage, index) => (
                                <div key={"loadingBarNumber" + index} onClick={() => { timeJump( percentage, index ) }} style={{left: (percentage > 0 ? (percentage - (900 / window.innerWidth)) : percentage) + "%"}} className={`${styles.marking}`}>{index + 1}
                                    <Tooltip color="pink">Scène {index + 1}</Tooltip>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Loading bar and informations surroundin it */}
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
                            <div className={`${styles.timeRef} beige`}>{convertToTime(totalTime)}</div>

                    </div>

                </div>
                <div></div>
                <div className={styles.bottomMenuContainer}>
                    <p>{currentText}</p>
                </div>
            </div>
            }

            {/* Buttons section */}
            {menuSectionState &&
            <div className={`${styles.panelSection}`}>


                {/* If the user is logged in, then show the real menu */}
                { currentUser &&
                    <>
                        <div className={`col-12 ${styles.multiplePanelsContainer}`}>
                            <Panel subTitle={`Visionner sans musique`} warpHorizontally onComponentClick={launchAnimWithoutMusic} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 121.06">
                                <path d="M7.6,22.7a6.53,6.53,0,0,1,7.67-10.56L120.2,88.64a6.53,6.53,0,0,1-7.68,10.56L7.6,22.7ZM88.85,52V23.09L60.43,31.25l-24-17.5L96.79,0V57.76L88.85,52ZM36.33,57.46v45.08c0,.32.05.64.05,1h0c0,7.76-8.14,15.46-18.19,17.2S0,117.55,0,109.79,8.15,94.33,18.19,92.6a20.53,20.53,0,0,1,10.21.66V51.68l7.93,5.78ZM92.87,98.69a20.84,20.84,0,0,1-11.09,5.63c-8.39,1.45-15.19-2.63-15.19-9.12,0-4,2.62-8,6.62-10.84L92.87,98.69Z"/>
                            </svg>
                            </Panel>
                            <Panel subTitle="Écouter en mode aléatoire" warpHorizontally onComponentClick={displayShuffledScenes}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.89 105.71">
                                    <path d="M0,79.45c0-2,.76-3.06,2.51-3.18H16.59c6,0,8.89.16,14-3.91a21.6,21.6,0,0,0,3.06-3c4.55-5.41,6.17-12,7.87-18.9C44.79,37,50,22.78,64,17.15c7.94-3.2,18.82-2.59,27.41-2.59h5.27v-10c0-5,1.18-5.88,4.79-2.45L121,20.64c2.36,2.24,2,3.7-.22,5.86L101.49,45c-3.37,3.41-4.89,2.45-4.82-2.26V30.94c-34-.52-32.57,1.67-42.05,34.09-3.5,10-8.81,17.08-15.59,21.69-7.09,4.82-13.68,6.39-22,6.39H6.65C.71,93.11,0,92.83,0,86.75v-7.3ZM.23,26.26c0,1.95.76,3.06,2.51,3.18h14.7c6,0,8.89-.16,14,3.91a21.6,21.6,0,0,1,3.06,3,26.74,26.74,0,0,1,3,4.35,67.43,67.43,0,0,1,5.82-13.5c.7-1.19,1.44-2.35,2.23-3.48A35.7,35.7,0,0,0,39.88,19c-7.09-4.82-13.68-6.39-22-6.39h-11C.94,12.6.23,12.88.23,19v7.3ZM53.57,80.45a29.1,29.1,0,0,0,11.27,8.11c7.94,3.2,18.21,2.59,26.8,2.59h5.27v10c0,5,1.18,5.88,4.79,2.45l19.55-18.58c2.36-2.24,2-3.7-.22-5.86l-19.3-18.5c-3.37-3.41-4.89-2.45-4.82,2.26v11.8c-24.78.38-30.42-.69-35.32-13.84-.27.94-.64,2.23-1.93,6.65l-.09.28h0a60.77,60.77,0,0,1-6,12.59Z" transform="translate(0 0)" fillRule="evenodd"/>
                                </svg>
                            </Panel>
                            <Panel subTitle="Sélectionner les extraits audio" warpHorizontally onComponentClick={reverseMenuStates}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.9 122.56">
                                    <path d="M6.57,0H47.35a6.54,6.54,0,0,1,5.08,2.42,6.65,6.65,0,0,1,1.11,2,6.38,6.38,0,0,1,.39,2.2v40.6a6.64,6.64,0,0,1-4.14,6.1,6.36,6.36,0,0,1-2.44.48H6.57a6.4,6.4,0,0,1-2.41-.48A6.28,6.28,0,0,1,2.06,52,6.49,6.49,0,0,1,.55,49.76,6.24,6.24,0,0,1,0,47.17V6.57a6.43,6.43,0,0,1,.43-2.3,6.36,6.36,0,0,1,1.19-2L1.89,2a6.38,6.38,0,0,1,2-1.4A6.65,6.65,0,0,1,6.57,0ZM89.72,62.4a26.16,26.16,0,0,1,10.11,2h.07a26.89,26.89,0,0,1,8.54,5.71,25.8,25.8,0,0,1,3.3,4,26.47,26.47,0,0,1,2.44,4.58,25.7,25.7,0,0,1,1.5,5,26.32,26.32,0,0,1,.51,5.16,27.15,27.15,0,0,1-.27,3.82,28.4,28.4,0,0,1-.83,3.74,26.64,26.64,0,0,1-1.15,3.13,28.33,28.33,0,0,1-1.41,2.74l10,10.85a1.57,1.57,0,0,1-.08,2.22h0l-7.45,6.81a1.66,1.66,0,0,1-1.11.39,1.56,1.56,0,0,1-1.09-.51l-9.5-10.45a27.06,27.06,0,0,1-2.73,1.41,24.79,24.79,0,0,1-3.11,1.17h0a26.51,26.51,0,0,1-17.76-.87h-.08A27.18,27.18,0,0,1,75,110.83a26,26,0,0,1-7.28-7.29,26.44,26.44,0,0,1-2.45-24.8v-.08a27.09,27.09,0,0,1,2.44-4.53A26.41,26.41,0,0,1,75,66.86a26.32,26.32,0,0,1,14.7-4.45Zm14.51,11.94a21.25,21.25,0,0,0-3.12-2.56,20.88,20.88,0,0,0-3.55-1.9H97.5a19.34,19.34,0,0,0-3.8-1.14,20.44,20.44,0,0,0-18.49,5.62l-.07.06a21.38,21.38,0,0,0-2.52,3.09A20.9,20.9,0,0,0,70.75,81v.06a21.13,21.13,0,0,0-1.14,3.81,20.37,20.37,0,0,0,5.57,18.49h0a20.59,20.59,0,0,0,3.11,2.55,19.63,19.63,0,0,0,3.53,1.89A20.26,20.26,0,0,0,85.7,109a20.71,20.71,0,0,0,8,0,19.77,19.77,0,0,0,3.84-1.16,21.52,21.52,0,0,0,3.54-1.9,20.74,20.74,0,0,0,3.12-2.56l.06-.06a20.74,20.74,0,0,0,4.4-6.6v-.07a20.23,20.23,0,0,0,1.13-3.8,20.69,20.69,0,0,0,.38-4A21.88,21.88,0,0,0,108.69,81a20.79,20.79,0,0,0-1.9-3.54A21.25,21.25,0,0,0,104.23,74.34ZM6.57,62.07H47.35a6.54,6.54,0,0,1,2.82.64,6.64,6.64,0,0,1,3.37,3.73,6.38,6.38,0,0,1,.39,2.2v40.6a6.5,6.5,0,0,1-.53,2.57,6.6,6.6,0,0,1-6,4H6.57a6.64,6.64,0,0,1-2.41-.48A6.36,6.36,0,0,1,2.06,114a6.68,6.68,0,0,1-1.51-2.17A6.41,6.41,0,0,1,0,109.24V68.64a6.43,6.43,0,0,1,.43-2.3,6.55,6.55,0,0,1,1.19-2l.27-.27a6.57,6.57,0,0,1,2-1.38,6.49,6.49,0,0,1,2.71-.6Zm40.79,6.55H6.57v40.63H47.39V68.62ZM69.51,0h40.78a6.54,6.54,0,0,1,2.82.64,6.74,6.74,0,0,1,2.26,1.78,6.3,6.3,0,0,1,1.1,2,6.38,6.38,0,0,1,.39,2.2v40.6a6.55,6.55,0,0,1-2,4.73,6.57,6.57,0,0,1-4.54,1.85H69.51a6.48,6.48,0,0,1-2.42-.48A6.37,6.37,0,0,1,65,51.93a6.68,6.68,0,0,1-2.06-4.76V6.57a6.65,6.65,0,0,1,1.63-4.31L64.82,2A6.58,6.58,0,0,1,69.51,0Zm40.78,6.55H69.51V47.2h40.83V6.57Zm-62.93,0H6.57V47.18H47.39V6.55Z" transform="translate(0)"/>
                                </svg>
                            </Panel>
                        </div>
                        
                        
                    </>
                }

                {/* If the user is not logged in, then only show the temporary menu */}
                { !currentUser && 
                    <Panel 
                    title="Conte musical" 
                    p1={`Clique ci-dessous pour visionner le conte de "Maélie et le dragon". Tu remarqueras qu'il manque un élément essentiel : la trame sonore !`}
                    p2="C'est normal, nous recueillons actuellement les fichiers audio envoyés par tous ceux qui veulent contribuer au projet. Sous peu, il sera possible d'entendre les différentes bandes sonores avec le conte illustré présenté ici-même."
                    p3="D'ici-là, jette un coup d'œil aux scènes et laisse-toi inspirer pour inventer ta propre bande sonore !"
                    >
                    <Button onClick={() => reverseMenuStates()}  color="white">
                        {"Visualiser le conte sans musique"}
                    </Button>
                    </Panel>
                }
                
            </div>
            }

            
        </section>
    );
}

export default SceneControl