import styles from './Panel.module.scss'



const Panel = ({title, subTitle, p1, p2, p3, warpHorizontally, onComponentClick, children}) => {


    return (

        <div onClick={onComponentClick ? onComponentClick : null} className={`
            ${styles.panelComponent} 
            ${warpHorizontally && styles['wrap-in-row']}
            ${onComponentClick && styles['clickable']}
            red_BG
            `}>

            <header className="col-12">
                {title && <h3 className="beige">{title}</h3>}
                {subTitle && <h4 className="beige">{subTitle}</h4>}

            </header>
            { p1 &&
                <p className="col-12">
                    { p1 }
                </p>
            }

            {p2 && 
                <p> { p2 } </p>
            }

            {p3 && 
                <p> { p3 } </p>
            }
            <div className="col-12">
                { children }
            </div>
        </div>
    );
}

export default Panel

