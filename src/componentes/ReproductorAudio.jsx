import { useRef, useState, useEffect, useCallback } from 'react'
import { Music as MusicIcon, Pause as PauseIcon } from 'lucide-react'
import estilos from './ReproductorAudio.module.css'

export default function ReproductorAudio() {
  const audioRef = useRef(null)
  const [reproduciendo, setReproduciendo] = useState(true)
  const interactuoRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const intentar = () => {
      if (audio.paused) {
        audio.play()
          .then(() => setReproduciendo(true))
          .catch(() => {})
      }
    }

    audio.addEventListener('canplay', intentar)
    intentar()

    const reintentar = setInterval(intentar, 300)
    setTimeout(() => clearInterval(reintentar), 5000)

    const alInteractuar = () => {
      if (interactuoRef.current) return
      interactuoRef.current = true
      audio.muted = false
      if (audio.paused) {
        audio.play()
          .then(() => setReproduciendo(true))
          .catch(() => {})
      }
    }

    document.addEventListener('touchstart', alInteractuar, { once: true })
    document.addEventListener('mousedown', alInteractuar, { once: true })

    return () => {
      audio.removeEventListener('canplay', intentar)
      clearInterval(reintentar)
      document.removeEventListener('touchstart', alInteractuar)
      document.removeEventListener('mousedown', alInteractuar)
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!interactuoRef.current) {
      interactuoRef.current = true
      audio.muted = false
      if (audio.paused) {
        audio.play()
          .then(() => setReproduciendo(true))
          .catch(() => {})
      }
      return
    }

    if (audio.paused) {
      audio.play()
        .then(() => setReproduciendo(true))
        .catch(() => {})
    } else {
      audio.pause()
      setReproduciendo(false)
    }
  }, [])

  return (
    <div className={estilos.envoltura}>
      <audio ref={audioRef} src="/cancion/cancion.mp3" loop preload="auto" muted autoPlay />
      <button
        className={`${estilos.boton}${reproduciendo ? ` ${estilos.activo}` : ''}`}
        onClick={toggle}
        aria-label={reproduciendo ? 'Pausar musica' : 'Reanudar musica'}
      >
        {reproduciendo
          ? <PauseIcon className={estilos.icono} />
          : <MusicIcon className={estilos.icono} />
        }
      </button>
    </div>
  )
}
