
import styles from './Panel.module.scss'
import Button from '../../Button/Button'


const Panel = ({title, p1, p2, buttonText, action}) => {


    return (

        <div className={`${styles.panelComponent} red_BG`}>

            <header className="col-12">
                <h3 className="beige">{title}</h3>
            </header>
            { p1 &&
                <p className="col-12">
                    { p1 }
                </p>
            }

            {p2 && 
                <p> { p2 } </p>
            }
            <Button onClick={action} reverse={true}>
                {buttonText}
            </Button>
        </div>
    );
}

export default Panel