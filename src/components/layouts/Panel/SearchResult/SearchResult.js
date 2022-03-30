

import styles from './SearchResult.module.scss'

const SearchResult = ({ artistName, choristNames, school, participantsName, onClick }) => {

    return (
        <article onClick={onClick} className={`${styles["search-result"]} col-12`}>
            <h5 className="col-12">{choristNames ? choristNames : artistName}</h5>
            {(school || participantsName) &&
                <div className={`${styles["horizontal-spacing"]} col-12`}></div>
            }
            { school &&
                <p><strong className="blue">École : </strong>{school}</p>
            }
            { participantsName &&
                <p><strong className="blue">Participants : </strong>{participantsName}</p>
            }
        </article>
    )
}

export default SearchResult