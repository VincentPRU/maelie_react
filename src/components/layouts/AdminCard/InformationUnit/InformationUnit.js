
import { useState } from 'react'

//Edit database function
import { updateInformationUnit } from '../utils/dbUpdates'

//components
import Input from '../../../forms/fields/Input/Input'

//Styling 
import styles from './InformationUnit.module.scss'


const InformationUnit = ({label, info, collection, docId, field}) => {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState({
        text: info
    })

    const updateEditMode = () => {
        if(!editMode){
            setEditMode(true)
        } else {
            updateInformationUnit(docId, collection, field, text.text);
            setEditMode(false)
        }
    }


    return (
        <div className={styles['information-unit']}>

            {
                (collection && docId && field ) &&
                <div onClick={() => updateEditMode()} className={styles['information-unit__modif-button']}>
                    { !editMode ? <span>&#x2710;</span> : <span>&nbsp; Soumettre &nbsp;</span> } 
                </div>
            }


            <div className={styles['information-unit__label']}> { label } : &nbsp; </div>
            { !editMode &&
            <span className={`${styles['information-unit__info']} ${ info ? "" : styles['information-unit__info--grey']}`}>
                {info ? text.text: 'Information non définie'}
            </span>
            }

            { editMode &&
                <form className={styles['information-unit__form']}>
                    <Input data={text} setData={setText} name="text" prefilled={text.text}></Input>
                </form>
            }
        </div>
    );
}

export default InformationUnit;