import styles from './Villager.module.scss'

import happyVillagerBlue from '../../../images/illustrations/villageois_bleu.png'
import angryVillagerBlue from '../../../images/illustrations/villageois_bleu_fourche.png'

import happyVillagerGreen from '../../../images/illustrations/villageois_vert.png'
import angryVillagerGreen from '../../../images/illustrations/villageois_vert_fourche.png'

import happyVillagerRed from '../../../images/illustrations/villageois_rouge.png'
import angryVillagerRed from '../../../images/illustrations/villageois_rouge_fourche.png'

import spearIllustration from '../../../images/illustrations/fourche.png'

import note from '../../../images/illustrations/notes.png'


const Villager = ({ color, angry, height, leftOffSet, protesting, active, spear, topSpear, spearAttacking, spearPos, attack, layerPos, layerTop, animationDelay, killed, reverse, notes, notesPlaying, noteDelay }) => {

    //Store the proper img in a constant
    
    const img = function() {
        if(color === "blue" && angry){ return angryVillagerBlue }
        if(color === "blue"){ return happyVillagerBlue }
        if(color === "green" && angry){ return angryVillagerGreen }
        if(color === "green"){ return happyVillagerGreen }
        if(angry){ return angryVillagerRed }
        return happyVillagerRed;
    }

    //for the differents layers of people. 
    const correctedHeight = layerPos ? (parseInt(height) * layerPos) + "vh" : height;
    const topModif = layerTop ? layerTop : "";

    //Height : correct the height value if angry to compensate for the spear
    const style = {
        height: angry ? (parseInt(correctedHeight) * 1.17) + "vh" : correctedHeight,
        left: leftOffSet ? leftOffSet : "",
        top: topModif
    }

    const protestingClass = protesting && active && !killed ? styles.protesting : "";

    let spearPosition = ""
    if(spearPos === "low"){ spearPosition = styles.lowSpear }
    if(spearPos === "high"){ spearPosition = styles.highSpear }

    const topSpearValue = topSpear && spear && attack ? topSpear : "";
    const spearAttackValue = spearAttacking && spear && active && attack && !killed ? styles.spearAttack : "";

    const animationDelayClass = animationDelay ? styles[animationDelay] : "";
    const killedClass = killed ? styles.killed : "";
 
    return (

        <div className={`${styles.villagerComponent} ${spearPosition} ${animationDelayClass} ${reverse && styles.shiftLeft}`}>

            <div className={``}>
                {
                    spear &&
                    <img 
                        style={{ top: topSpearValue }}
                        src={ spearIllustration }
                        alt="Illustration d'une fourche tenue par un villageois"
                        className={`${styles.spearIllustration} ${spearAttackValue} ${killedClass}`}
                    />
                }
                {
                    notes &&
                    <img 
                        src={ note }
                        style={{ left: leftOffSet ? leftOffSet : ""}}
                        alt="Illustration de notes de musique"
                        className={`${styles.musicNotes} ${notesPlaying && styles.notesPlaying} ${noteDelay && styles[noteDelay]}`}
                    />
                }
                <img 
                    style={ style }
                    className={`${styles.villagerIllustration} ${protestingClass} ${killedClass} ${reverse && styles.reverseVillager}`}
                    src={ img() }  
                    alt={ `Illustration d'un villageois ${angry && "en colère"}`}
                />
            </div>

        </div>

    );
}

export default Villager