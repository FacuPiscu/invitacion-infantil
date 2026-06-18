import estilos from './MarcoFoto.module.css'

export default function MarcoFoto({
  src,
  alt = '',
  zoom = false,
  iconoDecorativo: Icono = null,
  filaIconos: FilaIconos = null,
  children,
}) {
  const claseFondo = zoom ? `${estilos.fondoImg} ${estilos.fondoImgZoom}` : estilos.fondoImg

  return (
    <section className={estilos.seccion}>
      <img src={src} alt="" className={claseFondo} />
      <div className={estilos.gradiente} />
      <img src="/paleta/pngegg (1).png" alt="" className={estilos.decEsquinaSup} />
      <img src="/paleta/5874d03542e4d628738559ed.png" alt="" className={estilos.decEsquinaInf} />

      <div className={estilos.marcoExterior}>
        <img src={src} alt={alt} className={estilos.foto} />
      </div>

      {(Icono || FilaIconos || children) && (
        <div className={estilos.contenidoTexto}>
          {Icono && <Icono className={estilos.iconoDecorativo} />}
          {FilaIconos && (
            <div className={estilos.filaIconos}>{FilaIconos}</div>
          )}
          {children}
        </div>
      )}
    </section>
  )
}
