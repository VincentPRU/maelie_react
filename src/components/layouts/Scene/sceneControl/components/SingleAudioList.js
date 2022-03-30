import styles from './SingleAudioList.module.scss'


const SingleAudioList = ({artistName, school, city, index, counrty, singleLineMode, active, choristNames}) => {

    const artists = choristNames ? choristNames : artistName

    return (
        <li className={`col-12 ${styles["audio-list-element"]} ${singleLineMode && styles["audio-list-element--single-line"]} ${active && styles["audio-list-element--active"]}`}>    
            
            <div className={`col-12 ${styles["audio-list-element__main"]}`}>
                {index + 1 + ". " + artists}
            </div>
            { (school || city || counrty) && !singleLineMode &&
                <div className={`col-12 ${styles["audio-list-element__details"]}`}>
                    {school && 
                        <span className="yellow">{school}</span>
                    }
                    {school && (city || counrty) && " - "}
                    {city && city}
                    {city && counrty && ","}
                    {counrty && counrty}
                </div>
            }
            

        </li>
    )
}

export default SingleAudioList