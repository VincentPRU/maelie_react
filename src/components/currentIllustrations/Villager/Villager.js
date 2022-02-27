import styles from './Villager.module.scss'

import happyVillagerBlue from '../../../images/illustrations/villageois_bleu.png'
import angryVillagerBlue from '../../../images/illustrations/villageois_bleu_fourche.png'

import happyVillagerGreen from '../../../images/illustrations/villageois_vert.png'
import angryVillagerGreen from '../../../images/illustrations/villageois_vert_fourche.png'

import happyVillagerRed from '../../../images/illustrations/villageois_rouge.png'
import angryVillagerRed from '../../../images/illustrations/villageois_rouge_fourche.png'

import spearIllustration from '../../../images/illustrations/fourche.png'


const Villager = ({ color, angry, height, leftOffSet, protesting, active, spear, topSpear, spearAttacking, spearPos, attack, layerPos, layerTop, animationDelay, killed  }) => {

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

        <div className={`${styles.villagerComponent} ${spearPosition} ${animationDelayClass} `}>

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
                <img 
                    style={ style }
                    className={`${styles.villagerIllustration} ${protestingClass} ${killedClass}`}
                    src={ img() }  
                    alt={ `Illustration d'un villageois ${angry && "en colère"}`}
                />
            </div>

        </div>

    );
}

export default Villager