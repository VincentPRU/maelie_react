import { useState, useEffect } from 'react'

//components 
import InformationUnit from './InformationUnit/InformationUnit'
import Button from '../../Button/Button'
import AudioFile from './AudioFile/AudioFile'

//Component functionnalities
import { validateForm, deleteSingleCard } from './utils/dbUpdates'
 
//Db fetching utils
import { getContactById } from '../../../views/pages/AdminPage/utils/dbQueries'

//Css styling
import styles from './AdminCard.module.scss'




const AdminCard = ({sceneForm, data}) => {

    const [displayContent, setDisplayContent] = useState(false)
    const [contactInfos, setContactInfos] = useState();

    const {
        id,
        artistName,
        participantsName,
        choristNames,
        school,
        age,
        city,
        country,
        audioFiles,
        status, 
        createdAt
     } = data;

     useEffect(() => {
        getContactById(data.contactRef).then(setContactInfos)
    }, [])


    //Creation date display
    const dateOption = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    const currentDate = new Date(createdAt.seconds * 1000).toLocaleDateString("fr-CA", dateOption)

    //Value needed for the component buttons to look in the right collection
    const collection = sceneForm ? "credit" : "choral";

    //Open and close article
    const displayArticleContent = () => {
        if(!displayContent) setDisplayContent(true);
    }

    //Remove the cursor pointer if the content is displayed
    const componentStyle = {
        cursor: displayContent ? "auto" : "pointer"
    }

    return (
        <article 
            style={componentStyle} 
            onClick={ displayArticleContent } 
            className={`
                ${styles['admin-card']} 
                ${status === "accepted" && styles['admin-card--green']}
                ${status === "refused" && styles['admin-card--red']}
            `}>


            <header className="col-12">
                <div>
                    { sceneForm && artistName && <h3>{artistName}</h3>}
                    { !sceneForm && choristNames && <h3>{choristNames}</h3>}
                    <h5>{ contactInfos && contactInfos.firstname + " " + contactInfos.name }</h5>
                </div>
                <div>
                    { displayContent &&
                        <>
                            <Button onClick={() => setDisplayContent(false)}>Fermer</Button>
                            <br />
                        </>
                    }
                
                    Envoyé le <br/>
                    <strong>{currentDate}</strong>
                  
                    
                </div>
            </header>

            {/* Person contact form informations */}
            { displayContent &&  
                <section className={`${styles['admin-card__sections']} ${styles['admin-card__contact']}`}>

                    <header className="col-12">
                        <h4>
                            Informations de contact
                        </h4>
                    </header>
                    <div>
                        { contactInfos &&
                            <>
                            <InformationUnit label="Rôle" info={contactInfos.occupation} />
                            <InformationUnit label="Nom" collection={"contact"} docId={data.contactRef} field={"name"} info={contactInfos.name} />
                            <InformationUnit label="Prénom" collection={"contact"} docId={data.contactRef} field={"firstname"} info={contactInfos.firstname} />
                            <InformationUnit label="Courriel" collection={"contact"} docId={data.contactRef} field={"email"} info={contactInfos.email} />
                            </>
                        }
                    </div>
                    
                </section>
            }

            { displayContent &&  
                <section className={`${styles['admin-card__sections']} ${styles['admin-card__scene-form']}`}>

                    <header className="col-12">
                        { sceneForm &&
                            <h4> Informations soumises pour la bande sonore des scènes </h4>
                        }
                        { !sceneForm &&
                            <h4> Informations soumises pour la chanson de Maelie </h4>
                        }
                    </header>
                    <div>
                        { sceneForm &&
                            <>
                            <InformationUnit label="Nom d'artiste ou de groupe" info={artistName} collection={collection} docId={id} field={"artistName"} />
                            <InformationUnit label="Nom du ou des jeunes qui ont participé à la bande sonore" info={participantsName} collection={collection} docId={id} field={"participantsName"} />
                            <InformationUnit label="École" info={school} collection={collection} docId={id} field={"school"}/>
                            <InformationUnit label="Âge" info={age} collection={collection} docId={id} field={"age"}/>
                            <InformationUnit label="Municipalité" info={city} collection={collection} docId={id} field={"city"}/>
                            <InformationUnit label="Pays" info={country} collection={collection} docId={id} field={"country"}/>
                            </>
                        } 
                        { !sceneForm &&
                            <>
                            <InformationUnit label="Nom du / de la / des choriste.s ou du groupe" info={choristNames} collection={collection} docId={id} field={"choristNames"} />
                            <InformationUnit label="École" info={school} collection={collection} docId={id} field={"school"}/>
                            <InformationUnit label="Âge" info={age} collection={collection} docId={id} field={"age"}/>
                            <InformationUnit label="Municipalité" info={city} collection={collection} docId={id} field={"city"}/>
                            <InformationUnit label="Pays" info={country} collection={collection} docId={id} field={"country"}/>
                            </>
                        }  
                        
                    </div>

                    <header className="col-12">
                        <h4>Extraits audios</h4>
                    </header>

                    <div className={`
                        ${styles['admin-card__audio-container']} 
                        col-12
                    `}>
                        
                        {sceneForm &&
                            <>
                                <AudioFile objKey={"audio1"} value={audioFiles["audio1"]} collection={collection} documentId={id}/>
                                <AudioFile objKey={"audio2"} value={audioFiles["audio2"]} collection={collection} documentId={id}/>
                                <AudioFile objKey={"audio3"} value={audioFiles["audio3"]} collection={collection} documentId={id}/>
                                <AudioFile objKey={"audio4"} value={audioFiles["audio4"]} collection={collection} documentId={id}/>
                                <AudioFile objKey={"audio5"} value={audioFiles["audio5"]} collection={collection} documentId={id}/>
                            </>
                        }
                        {!sceneForm &&
                            <>
                                <AudioFile objKey={"choraleVirtuelle1"} value={audioFiles["choraleVirtuelle1"]} collection={collection} documentId={id}/>
                                <AudioFile objKey={"choraleVirtuelle2"} value={audioFiles["choraleVirtuelle2"]} collection={collection} documentId={id}/>
                                <AudioFile objKey={"choraleIndependante"} value={audioFiles["choraleIndependante"]} collection={collection} documentId={id}/>
                            </>
                        }
                        
                        

                    </div>
                    
                    <header className="col-12">
                        <h4>Options</h4>
                    </header>
                    <div className={`
                        ${styles['admin-card__button-container']} 
                        col-12
                    `}>
                        <div>
                            {   (status !== "accepted") && 
                                <Button color="green" onClick={ () => validateForm(id, collection, "accepted", contactInfos.firstname, contactInfos.email, (audioFiles["choraleIndependante"] ? true : false)) }>
                                    Accepter
                                </Button>
                            }
                            {   (status !== "refused") && 
                                <Button color="pink" onClick={ () => validateForm(id, collection, "refused", contactInfos.firstname, contactInfos.email, (audioFiles["choraleIndependante"] ? true : false)) }>
                                    Refuser
                                </Button>
                            }
                            {   (status === "accepted" || status === "refused") && 
                                <Button color="yellow" onClick={ () => validateForm(id, collection, "") }>
                                    À valider
                                </Button>
                            }
                            {   (status === "refused") && 
                                <Button color="red" onClick={ () => { deleteSingleCard(id, collection, data.contactRef, audioFiles) }} >
                                    Supprimer
                                </Button>
                            }
                        </div>
                    </div>
                    
     
                </section>
            }
        

        </article>
    );
    
}

export default AdminCard

