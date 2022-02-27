import { useState, useEffect } from 'react'

import './XAxisAnimation.scss'


const XAxisAnimation = ({ xAxisAnimation, children, rightBlock }) => {

/*
    const [animProperties, setAnimProperties] = useState({
        xAxis: ''
    })

    useEffect(() => {
        console.log("Useeffect called")
        setAnimProperties({
            xAxis: xAxisAnimation.XAxis
        })


    }, [xAxisAnimation])

    */


    return (
        <div className={`XAxisAnimation ${xAxisAnimation.XAxis}`} >
            { children }
        </div>
    );


}

export default XAxisAnimation;