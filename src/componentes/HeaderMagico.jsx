import { Sparkles as SparklesIcon, Wand2 as WandIcon, Crown as CrownIcon, Star as StarIcon } from 'lucide-react'
import estilos from './HeaderMagico.module.css'

export default function HeaderMagico({ imgSrc }) {
  return (
    <section className={estilos.seccion}>
      <img src={imgSrc} alt="" className={estilos.fondoImg} />
      <div className={estilos.gradiente} />
      <div className={estilos.centelleos} />
      <div className={estilos.polvoHadas} />
      <img src="/paleta/blancanieves-recorte.png" alt="" className={estilos.decRecorte} />

      <div className={estilos.contenido}>
        <div className={estilos.iconos}>
          <SparklesIcon className="anim-flotar" />
          <WandIcon className="anim-brillar" />
          <SparklesIcon className="anim-flotar-retrasado" />
        </div>
        <p className={estilos.pre}>Habia una vez...</p>
        <h1 className={estilos.nombre}>Nacia Delfina</h1>
        <div className={estilos.estrella}>
          <StarIcon className="anim-flotar" />
          <CrownIcon className="anim-brillar" />
          <StarIcon className="anim-flotar-retrasado" />
        </div>
        <p className={estilos.edad}>2 anitos</p>
        <p className={estilos.invitacion}>Te invitamos a celebrar</p>
      </div>
    </section>
  )
}
