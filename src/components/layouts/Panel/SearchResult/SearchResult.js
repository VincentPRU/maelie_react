

import styles from './SearchResult.module.scss'

const SearchResult = ({ artistName, choristNames, school, participantsName, date, onClick }) => {

    const dateOption = {year: "numeric", month: "long", day: "numeric"};

    return (
        <article onClick={onClick} className={`${styles["search-result"]} col-12`}>
            
            <header className={`${styles["search-result__header"]} col-12`}>
                <h5>{choristNames ? choristNames : artistName}</h5>
                <div className={`${styles["search-result--type-container"]}`}>
                    <small className={`${styles["search-result--type"]} ${artistName ? "green_BG" : "yellow_BG"}`}>
                        {artistName ? "Scènes" : "Chanson de Maélie"}
                    </small>
                </div>
            </header>
            {(school || participantsName) &&
                <div className={`${styles["horizontal-spacing"]} col-12`}></div>
            }
            { school &&
                <p><strong className="blue">École : </strong>{school}</p>
            }
            { participantsName &&
                <p><strong className="blue">Participants : </strong>{participantsName}</p>
            }
            {
              date && 
              <div className={`${styles["search-result__time-container"]} blue col-12`}>Soumis le {new Date(date.seconds * 1000).toLocaleDateString("fr-CA", dateOption)}</div>
            }
            
        </article>
    )
}

export default SearchResult