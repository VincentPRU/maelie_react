import React, { useRef, useContext, useEffect, useState } from 'react'

import Button from '../../Button/Button'

import { ScrollContext } from '../../../contexts/ScrollEvent'


import styles from './Poster.module.scss'

const getOverflowClassName = value => {
    if(value === 10){ return styles.xOverFlow_10 }
    if(value === 20){ return styles.xOverFlow_20 }
    if(value === 30){ return styles.xOverFlow_30 }
    if(value === 40){ return styles.xOverFlow_40 }
    if(value === 50){ return styles.xOverFlow_50 }
    return " ";
}

const Poster = ({header2, header3, paragraph, buttonText, buttonReverse, buttonColor, buttonAction, floatRight, top, bottom, topWidth, scrollTo }) => {
    
    const {scrollY} = useContext(ScrollContext);

    const [displayPoster, setDisplayPoster] = useState(false);

    const ref = useRef();
    

    useEffect(() => {
        if(ref){
            const elemTop = ref.current.getBoundingClientRect().top;
            //if the element is displayed, then evaluate if the condition is still good or does it need to be removed
            /*if(displayPoster){
                if(elemTop > window.innerHeight * 0.66){
                    setDisplayPoster(false);
                }
            }*/
            if(!displayPoster){
                if(elemTop < window.innerHeight * 0.66){
                    setDisplayPoster(true);
                }
            }
        }
    }, [scrollY])
    
    const marginT = top ? `${top}vh` : "";
    const marginTopFinal = topWidth ? `${topWidth}vw` : marginT;

    const floatDirection = floatRight ? styles.floatRight : "";

    const style = {
        marginTop: marginTopFinal,
        marginBottom: `${bottom}vw`
    }

    const displayPosterClasses = displayPoster ? "fade-Intro--In-Up" : "";

    

    return (
        <article 
            ref={ref} 
            style={style} 
            className={`${styles.posterComponent} ${floatDirection} ${displayPosterClasses} fade-Intro`}>
            <section>
                { header2 && <h2 className="beige col-12">{ header2 }</h2>}
                { header3 && <h3 className="beige col-12">{ header3 }</h3>}
                { paragraph && <p className="col-12 beige">{ paragraph }</p>}
                { buttonText && 
                    <Button to={buttonAction ? buttonAction : ""} 
                            color={buttonColor} reverse={buttonReverse} 
                            onClick={ scrollTo ? () => scrollTo() : null}
                            >
                        {buttonText}
                    </Button>
                }
            </section>

        </article>
    );
}

export default Poster