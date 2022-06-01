import React, {useRef, useEffect} from 'react'


//Styling
import styles from './AudioInfosCard.module.scss'
import Button from '../../../../../../components/Button/Button'


const AudioInfosCard = ({ data, hideInfos }) => {

    const modal = useRef();

    const hide = () => {
        modal.current.close();
        hideInfos();
    }

    useEffect(() => {
        if(!modal.current.open){
            modal.current.showModal();
        }
    }, [])

    return (
        <dialog ref={modal}  className={`${styles["audio-infos-card"]}`}>

            <h3 className="pink col-12">{ data.artistName ? data.artistName : data.choristNames }</h3>
            
            <small>Artiste(s)</small>
            
            <div className={`col-12 ${styles["line"]}`}></div>

            {
                data.participantsName &&
                <>
                    <h5 className="col-12">Participants</h5>
                    <p className="col-12">{data.participantsName}</p>
                </>
            }
            {
                data.school &&
                <>
                    <h5 className="col-12">École</h5>
                    <p className="col-12">{data.school}</p>
                </>
            }
            {
                data.age &&
                <>
                    <h5 className="col-12">Âge</h5>
                    <p className="col-12">{data.age}</p>
                </>
            }
            {
                data.city &&
                <>
                <h5 className="col-12">Ville</h5>
                <p className="col-12">{data.city}</p>
                </>
            }
            {
                data.country &&
                <>
                    <h5 className="col-12">Pays</h5>
                    <p className="col-12">{data.country}</p>
                </>
            }

            <div className={`col-12`}>
                <Button onClick={hide} color="pink">Fermer</Button>
            </div>

        </dialog>
    )
}

export default AudioInfosCard