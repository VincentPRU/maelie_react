import { useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';

/*  Data base functions */
import { changeAudioReference } from './utils/dbQueries'

/* Import components */
import Button from '../../../Button/Button'
import Input from '../../../forms/fields/Input/Input'
import File from '../../../forms/fields/File/File'

/* Styling */
import styles from './AudioFile.module.scss'


const AudioFile = ({objKey, value, collection, documentId}) => {

    const [optionsDisplay, setOptionsDisplay] = useState(false);

    /* Section display */
    const [linkDisplay, setLinkDisplay] = useState(false);
    const [replaceByLinkDisplay, setReplaceByLinkDisplay] = useState(false);
    const [replaceByFileDisplay, setreplaceByFileDisplay] = useState(false);

    /* Form states  */
    const [currentLink, setCurrentLink] = useState({
        url: null
    }); //Will be updated if the user decide to replace the current link
    const [newFile, setNewFile] = useState({
        file: null
    }); //Will be updated if the user decide to upload a new file

    //What to do with the old audio file if replace
    const [conserveFileIfReplaced, setConserveFileIfReplace] = useState(true)

    return (

        <div className={`${styles['audio-file']}`}>
            <div className={`col-12 ${styles['audio-file__header']}`}>
                <div>
                    <div onClick={() => { setOptionsDisplay(!optionsDisplay) }} className={styles['audio-file__modif-button']}>
                        <span>&#x2710;</span>
                    </div> 
                    <h5 className="col-12">{ objKey }</h5>
                </div>
                
                {
                    value &&
                    <form>
                        <label>
                            <small>Visible en aléatoire</small>
                            <input type="checkbox" checked="checked" />
                        </label>
                    </form>
                }
            </div>
            
            { value &&
            <ReactAudioPlayer
                src={value.address}
                controls
                />
            }

            { !value &&
                <small style={{padding: "1rem", float: "left", paddingTop: "0px"}}>Aucun extrait audio n'a été fourni pour cette piste</small>
            }

            {
                optionsDisplay &&
                <div className={`col-12 ${styles['audio-file__options-container']}`}>
                    {
                    value &&
                        <>
                            <Button onClick={() => { setLinkDisplay(!linkDisplay) }} color="green">{ linkDisplay ? "Masquer le lien" : "Obtenir le lien"}</Button>
                            <Button onClick={() => { setReplaceByLinkDisplay(!replaceByLinkDisplay) }} color="blue">
                                {replaceByLinkDisplay ? "Fermer l'onglet" : "Remplacer avec le lien d'un autre fichier"}
                            </Button>
                        </>
                    }
                    <Button 
                        onClick={() => {setreplaceByFileDisplay(!replaceByFileDisplay)}} 
                        color="yellow">
                            { value ? (replaceByFileDisplay ? "Fermer l'onglet" : "Remplacer par un fichier téléversé") : (replaceByFileDisplay ? "Fermer l'onglet" : "Ajouter un extrait audio")}
                    </Button>
                </div>
            }

            {/* 
            
                First button section
                Display link
            
            */}

            {
                linkDisplay && optionsDisplay &&
                <div className={`col-12 ${styles['audio-file__link-container']}`}>
                    <div>
                        { value.address }
                    </div>
                    
                </div>
            }

            {/* 
            
                Second button section
                Change link for another one
            
            */}
            {
                replaceByLinkDisplay && optionsDisplay &&
                <div className={`col-12 ${styles['audio-file__edit-link-container']}`}>
                    <form onSubmit={(e) => changeAudioReference(e, collection, documentId, objKey, currentLink.url, conserveFileIfReplaced, value.address)}>
                        <Input data={currentLink} setData={setCurrentLink} name="url" isRequired prefilled='Collez le nouveau lien ici'>Collez ici le lien de l'extrait audio qui remplacera celui présent actuellement.</Input>
                        <div className="col-12">
                            <Button color="white">Soumettre le changement</Button>
                            <div className={` ${styles['audio-file__edit-link-container__delete-check-box']}`}>
                                <div>
                                    <small>Conserver l'ancier fichier audio en mémoire</small>
                                    <input 
                                        type="checkbox" 
                                        checked={
                                            conserveFileIfReplaced && "check"
                                        } 
                                        onClick={() => setConserveFileIfReplace(!conserveFileIfReplaced)}
                                        />
                                </div>
                            </div>
                        </div>
                        {
                            !conserveFileIfReplaced &&
                            <strong><small className={` ${styles['audio-file__warning']}`}><span className="red">ATTENTION !</span> Cette fonction aura pour effet de supprimer définitivement l'ancien fichier audio. Ne pas l'utiliser si l'objectif est d'interchanger deux fichiers.</small></strong>
                        }
                    </form>
                </div>
            }



            {/* 
            
                Third button section
                Upload a new file
            
            */}
            {
                replaceByFileDisplay && optionsDisplay &&
                <div className={`col-12 ${styles['audio-file__edit-file-container']}`}>
                    <form>
                        <File data={newFile} setData={setNewFile} name="file" isRequired={true}>Téléverser le nouvel extrait audio (format mp3)</File>
                        <div className="col-12">
                            <Button color="white">Soumettre le changement</Button>
                            {
                                value &&

                                <div className={` ${styles['audio-file__edit-link-container__delete-check-box']}`}>
                                    <div>
                                        <small>Conserver l'ancier fichier audio en mémoire</small>
                                        <input 
                                            type="checkbox" 
                                            checked={
                                                conserveFileIfReplaced && "check"
                                            } 
                                            onClick={() => setConserveFileIfReplace(!conserveFileIfReplaced)}
                                            />
                                    </div>
                                </div>

                            }
                        </div>
                        {
                            !conserveFileIfReplaced &&
                            <strong><small className={` ${styles['audio-file__warning']}`}><span className="red">ATTENTION !</span> Cette fonction aura pour effet de supprimer définitivement l'ancien fichier audio. Ne pas l'utiliser si l'objectif est d'interchanger deux fichiers.</small></strong>
                        }
                    </form>
                </div>
            }

  
            

        </div>
    );
}

export default AudioFile