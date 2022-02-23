import React, { useEffect, useState, useContext, useRef } from 'react'

import { ScrollContext } from '../../../contexts/ScrollEvent'

import styles from './OverflowImagesContainer.module.scss'


const OverflowImagesContainer = ({ left, width, yTransformFactor, top, noBlurEffect, children }) => {


    const {scrollY, winHeight, docHeight, winWidth} = useContext(ScrollContext);

    const [parentWidth, setParentWidth] = useState(window.innerWidth);

    const componentRef = useRef(null);

    //Resize the width of the view port and pass the information to the children components
    useEffect(() => {
    
        if(componentRef.current){ setParentWidth(componentRef.current.offsetWidth) }

    }, [componentRef, winWidth])

    //Top position when the offset of the page is at zero
    const initialTopValue = useRef(0);

    //On mount, record the distance between the container and the top of the view port. 
    //This is going to be used to delay the animation until the element reache the view port
    useEffect(() => {
        
        if(componentRef.current && initialTopValue.current === 0){
                window.scrollTo(0, 0);
            
            initialTopValue.current = componentRef.current.getBoundingClientRect().top;
        }

    }, [componentRef, docHeight])

    const topValue = top ? (top * window.innerHeight) + "px" : 0;

    


    //Calculate if and of how much the animation shoud run 
    const calculatedScroll = scrollY - (initialTopValue.current - (winHeight/2)) > 0 ? scrollY - (initialTopValue.current - (winHeight/2)) : 0;

    let blurStyle = 0;
    if(!noBlurEffect){ blurStyle = calculatedScroll > (winHeight * 0.75) ? 3 : 0; }

    const style = {
        left: left, 
        width: width,
        top: topValue,
        WebkitTransform: `translate(-50%, ${parseInt(yTransformFactor * calculatedScroll)}px)`,
        MozTransform: `translate(-50%, ${parseInt(yTransformFactor * calculatedScroll)}px)`,
        MsTransform: `translate(-50%, ${parseInt(yTransformFactor * calculatedScroll)}px)`,
        OTransform: `translate(-50%, ${parseInt(yTransformFactor * calculatedScroll)}px)`,
        transform: `translate(-50%, ${parseInt(yTransformFactor * calculatedScroll)}px)`,
        filter: `blur(${blurStyle}px)`
    }


    return (

            <div 
                style={style} 
                className={`${styles.overflowContainer} fade-Intro fade-Intro--In`}
                ref = { componentRef }
            >
                {
                    React.Children.map(children, (child) =>
                        React.cloneElement(child, {
                            parentwidth: parentWidth
                        })
                    )
                }

            </div>
    );
    
}

export default OverflowImagesContainer;