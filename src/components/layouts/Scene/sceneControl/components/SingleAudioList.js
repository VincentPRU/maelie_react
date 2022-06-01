import React from 'react'


import styles from './SingleAudioList.module.scss'


const SingleAudioList = ({artistName, school, city, index, counrty, singleLineMode, active, choristNames, jumpToScene, displayInfos}) => {

    const artists = choristNames ? choristNames : artistName

    const audioCaterogie = index < 5 ? "Scène " + (index + 1) : "Chanson de Maélie"

    return (
        <li 
            className={`col-12 ${styles["audio-list-element"]} ${singleLineMode && styles["audio-list-element--single-line"]} ${active && styles["audio-list-element--active"]}`}
        >    
            
            <div 
                className={`${styles["audio-list-element--click-selector"]}`}
                onClick={ !singleLineMode ? (() => jumpToScene()) : undefined}>

                <div className={`col-12 ${styles["audio-list-element__main"]}`}>
                    <span className={`col-12 ${styles["hidden-text-overflow"]}`} >
                        {audioCaterogie + " - " + artists}
                    </span>
                </div>

                { (school || city || counrty) && !singleLineMode &&
                    <div className={`col-12 ${styles["audio-list-element__details"]}`}>
                        <span className={`col-12 ${styles["hidden-text-overflow"]}`}>
                            {school && 
                                <span className="yellow">{school}</span>
                            }
                            {school && (city || counrty) && " - "}
                            {city && city}
                            {city && counrty && ","}
                            {counrty && counrty}
                        </span>
                    </div>
                }

            </div>
            
            {
                !singleLineMode &&
                <div>
                    <button 
                        className={`${styles["information-icon"]}`}
                        onClick={displayInfos}
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.46 16.1">
                            <circle cx="8.96" cy="7.5" r="6.5" strokeMiterlimit="10" strokeWidth="2"/>
                            <path d="M1.5,10.88h2a0,0,0,0,1,0,0v5a1,1,0,0,1-1,1h0a1,1,0,0,1-1-1v-5a0,0,0,0,1,0,0Z" transform="translate(10.87 2.41) rotate(46.84)"/>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                            <circle cx="6" cy="6" r="6"/>
                        </svg>

                    </button>
                </div>
            }
            

        </li>
    )
}

export default SingleAudioList