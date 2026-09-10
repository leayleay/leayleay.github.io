import './CommanditesVisual.css'

export default function CommanditesVisual() {
  return <div className="project-visual commandites-visual">
    <span className="visual-caption">A SHARED PLAN. ONE NEXT STEP.</span>
    <div className="commandites-window" aria-hidden="true">
      <div className="commandites-top"><strong>PolyHX <span>↗</span></strong><span>JANVIER 2027</span></div>
      <div className="commandites-body"><span className="eyebrow">COMMANDITES 2027</span><h4>On fait équipe.</h4>
        <div className="commandites-stats"><div><strong>712</strong><span>compagnies</span></div><div><strong>14</strong><span>modèles</span></div><div><strong>A / B / C</strong><span>priorités</span></div></div>
        <div className="commandites-queue"><span>MA FILE</span><div><i>A</i><strong>Premier contact</strong><span>Préparer →</span></div><div><i>B</i><strong>Relance à faire</strong><span>Reprendre →</span></div><div><i>C</i><strong>Dossier à envoyer</strong><span>Consulter →</span></div></div>
      </div>
      <div className="commandites-bottom"><span>Du premier bonjour au merci.</span><span>✳</span></div>
    </div>
    <span className="preview-label">INTERFACE ILLUSTRATION · SAMPLE QUEUE</span>
  </div>
}
