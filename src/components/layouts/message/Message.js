import { useState } from 'react'

import styles from './Message.module.scss'




const Message = ({ children, positiveReview }) => {

    const [active, setActive] = useState(true);

    const [hideProperty, setHideProperty] = useState(false);

    const hideElement = () => {
        if(!hideProperty) setHideProperty(true);
        setTimeout(() => setActive(false), 1500)
    }

    setTimeout(() => {
        hideElement();
    }, 8000)



    return (
        <>
            {active && children &&       
                <aside className={`${styles.messageComponent} ${positiveReview && styles.positiveReview} ${!hideProperty && styles.display} ${hideProperty && styles.hide}`}>

                    <p className="beige">{children}</p>

                    <div onClick={() => { hideElement() }} className={styles.xbutton}>&#10005;</div>
                    
                </aside>
            }
        </>
    );
}

export default Message