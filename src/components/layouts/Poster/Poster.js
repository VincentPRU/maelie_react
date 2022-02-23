import React from 'react'

import Button from '../../Button/Button'

import styles from './Poster.module.scss'

const Poster = ({ img, alt, header2, header3, paragraph, buttonText, buttonReverse, buttonColor, floatRight, top, bottom }) => {

    const floatDirection = floatRight ? styles.floatRight : "";

    const style = {
        marginTop: `${top}vh`,
        marginBottom: `${bottom}vw`
    }

    return (
        <article style={style} className={`beige_BG ${styles.posterComponent} ${floatDirection}`}>
            <section>
                { header2 && <h2 className="pink col-12">{ header2 }</h2>}
                { header3 && <h3 className="blue col-12">{ header3 }</h3>}
                { paragraph && <p className="col-12">{ paragraph }</p>}
                { buttonText && 
                    <Button color={buttonColor} reverse={buttonReverse} >
                        {buttonText}
                    </Button>
                }
            </section>
            <div>
                <figure>
                    <img src={ img } alt={ alt } />
                </figure>
            </div>
        </article>
    );
}

export default Poster