import { useEffect } from 'react'

import styles from './Credits.module.scss'

import maelie from '../../../images/illustrations/Maelie.png'
import tree from '../../../images/illustrations/arbre.png'
import house from '../../../images/illustrations/maison_200.png'


const Credits = () => {

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])


    return (
      <section className={ styles.creditsComponent }>
          <div className="maxWidthPageContainer">

            <header className="col-12">
                <h1 className="red ">Détails du projet</h1>
            </header>
            <div className="col-12">
              <p className="col-12">
              Le volet jeunesse de la Société de musique contemporaine du Québec (SMCQ) enrichit sa panoplie d’activités en ligne avec sa toute dernière innovation :
              Maélie et le dragon.
              </p>

              <h4 className="blue col-12">Le coup de foudre d’un compositeur pour l’histoire d’une petite fille</h4>
              <p className="col-12"> 
              À l’origine de ce nouveau projet, un coup de cœur : celui de Denis Gougeon pour le conte de
              Marianne Gagnon, une petite fille de neuf ans. « J’ai tout de suite été touché par ce récit où la
              musique devient l’arme pacifique d’une jeune fille courageuse devant un dragon » précise ce
              compositeur aguerri.
              </p>

              <h4 className="blue col-12">Composer une bande sonore : un projet dragonesque</h4>
              <p className="col-12">
              Il n’en fallait pas plus pour que la SMCQ transforme ce coup de foudre en un projet novateur.
              « Les enfants aiment inventer des histoires, mais là on leur propose de mettre un conte en
              musique. C’est intéressant de les voir se glisser dans la peau d’un compositeur de film, surtout
              dans cet univers de légende dont ils sont friands. » mentionne Claire Cavanagh, directrice du
              volet jeunesse SMCQ.
              </p>

              <p className="col-12">
              À cet effet, la SMCQ a ainsi développé une application web interactive avec
              un univers graphique qui illustre, scène par scène, le conte Maélie et le dragon. Les participants
              pourront y déposer leurs bandes sonores qui s’agenceront avec les images où ils
              pourront également découvrir celles de leurs amis comme autant de
              variations sur un même thème!
              </p>

              <div className="col-12">
                <img src={ maelie } alt="Illustration d'une petite fille." />
                <img src={ tree } alt="Illustration d'une petite fille." />
                <img src={ house } alt="Illustration d'une petite fille." />

              </div>

              <h4 className="blue col-12">Le volet jeunesse SMCQ : tout feu tout flamme</h4>
              <p className="col-12">En plus de la création sonore, ce projet musical est également axé sur l’interprétation musicale. Les participants peuvent aussi apprendre la Chanson de Maélie à partir des partitions et du karaoké disponibles sur notre plateforme éducative et s'enregistrer.</p>
              <p>
              Cette activité de conte sonorisé est conçue en collaboration avec Hélène Lévesque, conseillère pédagogique en musique au CSSDM, et proposé aux différentes commissions scolaires du pays avec lesquels la SMCQ travaille régulièrement, en plus d’être offert en libre accès à toutes les familles. Elle développe ainsi différentes compétences chez l’enfant tout en renouant avec le plaisir de créer, de chanter… et de partager toutes ces trouvailles musicales ! 
              </p>

              <h4 className="blue">Crédits</h4>
              <ul className="col-12">
                <li>Conte « Maélie et le dragon » par Marianne Gagnon, 9 ans « Chanson de Maélie » par Denis Gougeon</li>
                <li>Illustrations par Geneviève Bigué</li>
                <li>Conception web par Vincent Poirier-Ruel</li>
                <li>Guide pédagogique par Claire Cavanagh et Hélène Lévesque, conseillère pédagogique en musique au Centre de services scolaire de Montréal</li>
                <li>D’après une idée originale de Claire Cavanagh</li>
                <li>Production de la SMCQ Jeunesse 2022</li>
              </ul>

              <h4 className="blue col-12">À propos de la SMCQ</h4>
              <p className="col-12">
                <span>Au cœur de la création musicale depuis plus de 50 ans, la SMCQ se consacre à la valorisation du travail des compositeurs. Au fil des années, elle s’est imposée sur la scène culturelle par la qualité et l’envergure de ses concerts et activités, qui se démarquent par leur aspect rassembleur. Pour connaître tous les projets de la SMCQ, </span><span className="pink" style={{cursor: "pointer"}} onClick={event =>  window.location.href='http://www.smcq.qc.ca/smcq/fr/apropos/liste/'} >inscrivez-vous à l’infolettre</span>.
              </p>

              <h4 className="blue col-12">Volet Jeunesse SMCQ</h4>
              <p className="col-12">
              Cette initiative s’inscrit dans le prolongement du programme jeunesse de la SMCQ qui rejoint déjà plus de 200 écoles et 40 000 élèves à travers le pays par l’entremise d’ateliers, de concerts et d’activités. Rassemblant artistes et pédagogues, la SMCQ a développé au fil des ans une vaste gamme de projets et plus de 300 ressources éducatives pour découvrir les compositeurs d’aujourd’hui et la création musicale. Présentés sous forme de « trousses pédagogiques » thématiques, ces outils sont offerts gratuitement aux enseignants sur la plateforme <span className="pink" style={{cursor: "pointer"}} onClick={event =>  window.location.href='https://smcqeducation.ca/'} >smcqeducation.ca</span>.
              </p>

            </div>
          </div>
      </section>
    );

}
  
  
export default Credits;
  