import React, { createContext, useEffect, useState, useRef } from 'react'


//create context   
export const ScrollContext = createContext();

export function ScrollEventProvider( {children} ){

    const [scrollY, setScrollY] = useState(0);
    const [winHeight, setWinHeight] = useState(window.innerHeight || 0);
    const [docHeight, setDocHeight] = useState(document.body.clientHeight || 0);
    const [winWidth, setWinWidth] = useState(window.innerWidth || 0);

    // Cached refs just used for useEffect dependency
    const _scrollY = useRef(scrollY);
    _scrollY.current = scrollY;        //update the ref on mount

    const _winHeight = useRef(0);
    _winHeight.current = winHeight;    //update the ref on mount

    const _winWidth = useRef(0);
    _winWidth.current = winWidth;      //update the ref on mount

    const _docHeight = useRef(0);
    _docHeight.current = docHeight;    //update the ref on mount

    let windowResized = useRef(false);      //Turn to true when a resize event is detected
    let yScrollEvent = useRef(false);


    useEffect(() => {

        let animationId = null;

        let frame = 0

        /* It is bugging me to have a hugh number */
        if(frame > 10000){ frame = 0 }

        //for the animation to wait after the en of the scrolling
        let lastScrollCount = 0;
        let waitingToUpDateYScroll = false;

        //Recursive loop to control the quantity of event that are going to be analysed
        const onTick = () => {
            frame++;
            lastScrollCount++;
            
            //Reduce the fps to 4 / seconds
            if(frame % 2 === 0){

                //Update the scroll position if needed
                if (yScrollEvent.current && (window.pageYOffset || 0) !== _scrollY.current){
                    

                    //set it back to false once the previous functions are done
                    yScrollEvent.current = false;
                    setScrollY(window.pageYOffset || 0);
                } 

/*
                //Update the scroll position if needed
                if (yScrollEvent.current && (window.pageYOffset || 0) !== _scrollY.current){
                    

                    //set it back to false once the previous functions are done
                    yScrollEvent.current = false;
                    lastScrollCount = 0;
                    waitingToUpDateYScroll = true;
                } else {
                    if(lastScrollCount > 3 && waitingToUpDateYScroll){
                        setScrollY(window.pageYOffset || 0);
                        console.log("inside")
                        lastScrollCount = 0;
                        waitingToUpDateYScroll = false;
                    }
                }
       */         

                if(windowResized.current){
                    //Update window's height 
                    setWinHeight(window.innerHeight)

                    //Update window's width
                    setWinWidth(window.innerWidth) 

                    //Update document's height
                    setDocHeight(document.body.clientHeight) 

                    //turn it back to false once both functions are executed
                    windowResized.current = false;
                }
            }
            
            animationId = window.requestAnimationFrame(onTick);
        };
    
        onTick();
    
        const onScroll = () => { yScrollEvent.current = true }


        const onResize = () => { windowResized.current = true }

        document.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            document.removeEventListener('scroll', onScroll);
        }


    }, [_scrollY, _winHeight, _docHeight, _winWidth, yScrollEvent, windowResized])
    
    const values = {
        scrollY: scrollY,
        winHeight: winHeight,
        docHeight: docHeight,
        winWidth: winWidth
    }


    return (
        <ScrollContext.Provider value={values}>
            {children}
        </ScrollContext.Provider>
    );
}
