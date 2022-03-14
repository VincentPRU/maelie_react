import ReactAudioPlayer from 'react-audio-player';

import styles from './AudioFile.module.scss'


const AudioFile = ({objKey, value}) => {




    return (
        <div className={`${styles['audio-file']}`}>
            <h5 className="col-12">{ objKey }</h5>
            
            { value &&
            <ReactAudioPlayer
                src={value}
                controls
                />
            }

            { !value &&
                <small>Aucun extrait audio n'a été fourni pour cette piste</small>
            }
        </div>
    );
}

export default AudioFile