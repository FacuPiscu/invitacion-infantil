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
      <img src="/paleta/pngwing.com.png" alt="" className={estilos.marcoSupDer} />
      <img src="/paleta/pngegg (1).png" alt="" className={estilos.marcoInfIzq} />

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
