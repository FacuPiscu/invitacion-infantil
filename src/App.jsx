import { useRef, useState, useEffect, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'
import { CalendarIcon, ClockIcon, MapPinIcon, HeartIcon, StarIcon, MusicIcon, PauseIcon, CrownIcon, SparklesIcon, BookIcon, CastleIcon, WandIcon, TreeIcon, FlowerIcon } from './icons'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const IMG = [
  '/imagenes/WhatsApp Image 2026-06-17 at 22.08.21 (1).jpeg',
  '/imagenes/WhatsApp Image 2026-06-17 at 22.08.21.jpeg',
  '/imagenes/WhatsApp Image 2026-06-17 at 22.08.22.jpeg',
  '/imagenes/WhatsApp Image 2026-06-17 at 22.08.23 (1).jpeg',
  '/imagenes/WhatsApp Image 2026-06-17 at 22.08.23.jpeg',
]

const WHATSAPP_MADRE = '543813661892'
const UBICACION = { lat: -26.9277535, lng: -65.3249123, nombre: 'Salon Multiusos Barrio UOM' }
const FECHA_EVENTO = new Date(2026, 5, 28, 17, 0, 0)

function App() {
  const audioRef = useRef(null)
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [tipo, setTipo] = useState('individual')
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = FECHA_EVENTO - Date.now()
      if (diff <= 0) return
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [familiaNombre, setFamiliaNombre] = useState('')
  const [cantidad, setCantidad] = useState('')

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      if (audio.paused) {
        audio.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      }
    }

    audio.addEventListener('canplay', tryPlay)
    audio.addEventListener('loadedmetadata', tryPlay)

    tryPlay()

    const retry = setInterval(tryPlay, 300)
    setTimeout(() => clearInterval(retry), 5000)

    const onInteraction = () => tryPlay()
    document.addEventListener('touchstart', onInteraction, { once: true })
    document.addEventListener('click', onInteraction, { once: true })

    return () => {
      audio.removeEventListener('canplay', tryPlay)
      audio.removeEventListener('loadedmetadata', tryPlay)
      clearInterval(retry)
      document.removeEventListener('touchstart', onInteraction)
      document.removeEventListener('click', onInteraction)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }, [])

  const initMap = useCallback(() => {
    if (mapInstanceRef.current) return
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude
        const userLng = pos.coords.longitude
        if (!mapRef.current) return
        const map = L.map(mapRef.current, { zoomControl: false }).setView([userLat, userLng], 14)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map)
        L.marker([userLat, userLng]).addTo(map).bindPopup('Tu ubicacion').openPopup()
        L.marker([UBICACION.lat, UBICACION.lng]).addTo(map).bindPopup(UBICACION.nombre).openPopup()
        mapInstanceRef.current = map
        setTimeout(() => map.invalidateSize(), 300)
      },
      () => {
        if (!mapRef.current) return
        const map = L.map(mapRef.current, { zoomControl: false }).setView([UBICACION.lat, UBICACION.lng], 14)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map)
        L.marker([UBICACION.lat, UBICACION.lng]).addTo(map).bindPopup(UBICACION.nombre).openPopup()
        mapInstanceRef.current = map
        setTimeout(() => map.invalidateSize(), 300)
      }
    )
  }, [])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        initMap()
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(mapRef.current)
    return () => obs.disconnect()
  }, [initMap])

  const abrirFormulario = useCallback(() => {
    setShowForm(true)
  }, [])

  const cerrarFormulario = useCallback(() => {
    setShowForm(false)
  }, [])

  const enviarConfirmacion = useCallback(() => {
    let mensaje = ''
    if (tipo === 'individual') {
      if (!nombre.trim() || !apellido.trim()) return
      mensaje = `Hola, soy ${nombre.trim()} ${apellido.trim()} confirmo mi asistencia al cumpleanos`
    } else {
      if (!familiaNombre.trim() || !cantidad.trim()) return
      mensaje = `Hola, somos la familia ${familiaNombre.trim()}, confirmamos nuestra asistencia al cumpleanos, somos ${cantidad.trim()} integrantes`
    }
    setShowForm(false)
    window.open(`https://wa.me/${WHATSAPP_MADRE}?text=${encodeURIComponent(mensaje)}`, '_blank')
  }, [tipo, nombre, apellido, familiaNombre, cantidad])

  return (
    <>
      <audio ref={audioRef} src="/cancion/cancion.mp3" loop preload="auto" />

      <section className="page cover">
        <img src={IMG[0]} alt="" className="page-img" />
        <div className="page-gradient" />
        <div className="sparkles" />
        <div className="page-content cover-content">
          <div className="cover-icons"><SparklesIcon /> <WandIcon /> <SparklesIcon /></div>
          <p className="cover-pre">Habia una vez...</p>
          <h1 className="cover-name">Nacia Delfina</h1>
          <div className="cover-stars">
            <StarIcon /> <CrownIcon /> <StarIcon />
          </div>
          <p className="cover-age">2 a&ntilde;itos</p>
          <p className="cover-invite">Te invitamos a celebrar</p>
        </div>
      </section>

      <section className="page">
        <img src={IMG[1]} alt="" className="page-img page-img-zoom" />
        <div className="page-gradient" />
        <div className="page-content page-content-center">
          <BookIcon className="page-deco-icon" />
          <p className="page-text">
            Habia una vez, en un reino no muy lejano, hace no mucho tiempo, un Rey y una Reina que anhelaban una hija
          </p>
        </div>
      </section>

      <section className="page">
        <img src={IMG[2]} alt="" className="page-img" />
        <div className="page-gradient" />
        <div className="page-content page-content-center">
          <CastleIcon className="page-deco-icon" />
          <p className="page-text">
            Un dia, su deseo fue cumplido y fueron bendecidos con una hermosa nina que llamaron <span className="page-name">Nacia Delfina</span>
          </p>
        </div>
      </section>

      <section className="page">
        <img src={IMG[3]} alt="" className="page-img" />
        <div className="page-gradient" />
        <div className="page-content page-content-center">
          <div className="page-deco-row"><TreeIcon /> <FlowerIcon /> <TreeIcon /></div>
          <p className="page-text">
            El tiempo volo y la princesa crecio, llenando cada dia de magia y alegria
          </p>
        </div>
      </section>

      <section className="page">
        <img src={IMG[4]} alt="" className="page-img" />
        <div className="page-gradient" />
        <div className="page-content page-content-center">
          <CrownIcon className="page-deco-icon" />
          <p className="page-text page-text-center">El palacio esta de fiesta</p>
          <h2 className="page-title">porque nuestra princesa</h2>
          <p className="page-age">cumple 2 a&ntilde;itos</p>
          <div className="detail-cards">
            <div className="detail-card">
              <div className="detail-icon"><CalendarIcon /></div>
              <div>
                <p className="detail-label">Fecha</p>
                <p className="detail-value">Domingo 28 de Junio</p>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><ClockIcon /></div>
              <div>
                <p className="detail-label">Hora</p>
                <p className="detail-value">17:00 hs</p>
              </div>
            </div>
            <div className="detail-card">
              <div className="detail-icon"><MapPinIcon /></div>
              <div>
                <p className="detail-label">Lugar</p>
                <p className="detail-value">{UBICACION.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page page-map">
        <div className="page-solid-bg" />
        <div className="countdown-bar">
          <div className="countdown-block">
            <span className="countdown-num">{String(countdown.d).padStart(2, '0')}</span>
            <span className="countdown-unit">dias</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-block">
            <span className="countdown-num">{String(countdown.h).padStart(2, '0')}</span>
            <span className="countdown-unit">horas</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-block">
            <span className="countdown-num">{String(countdown.m).padStart(2, '0')}</span>
            <span className="countdown-unit">min</span>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-block">
            <span className="countdown-num">{String(countdown.s).padStart(2, '0')}</span>
            <span className="countdown-unit">seg</span>
          </div>
        </div>
        <div className="page-content page-map-content">
          <h2 className="page-title">Donde es</h2>
          <p className="page-sub">Te esperamos en</p>
          <div ref={mapRef} className="map-container" />
        </div>
      </section>

      <section className="page page-confirm">
        <div className="page-solid-bg" />
        <div className="page-content page-confirm-content">
          <HeartIcon />
          <h2 className="page-title">Confirma tu presencia</h2>
          <p className="page-sub">Decinos si venis para esperarte con todo el amor</p>
          <button className="btn-primary" onClick={abrirFormulario}>
            Confirmar Asistencia
          </button>
          <div className="audio-control" onClick={togglePlay}>
            {playing ? <><MusicIcon /> Musica sonando</> : <><PauseIcon /> Reanudar musica</>}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-stars">
          <StarIcon /> <StarIcon />
        </div>
        <p className="footer-name">Nacia Delfina</p>
        <p className="footer-age">2 a&ntilde;itos</p>
        <p className="footer-thanks">Gracias por ser parte de este sueno</p>
      </footer>

      {showForm && (
        <div className="modal-overlay" onClick={cerrarFormulario}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={cerrarFormulario}>x</button>
            <h2 className="modal-title">Confirmar Asistencia</h2>
            <div className="tipo-selector">
              <button className={`tipo-btn ${tipo === 'individual' ? 'active' : ''}`} onClick={() => setTipo('individual')}>Individual</button>
              <button className={`tipo-btn ${tipo === 'familia' ? 'active' : ''}`} onClick={() => setTipo('familia')}>Familia</button>
            </div>
            {tipo === 'individual' ? (
              <>
                <input className="input" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input className="input" type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
              </>
            ) : (
              <>
                <input className="input" type="text" placeholder="Nombre de la familia" value={familiaNombre} onChange={(e) => setFamiliaNombre(e.target.value)} />
                <input className="input" type="number" placeholder="Cantidad de integrantes" value={cantidad} onChange={(e) => setCantidad(e.target.value)} min="1" />
              </>
            )}
            <button className="btn-primary modal-btn" onClick={enviarConfirmacion}>Enviar por WhatsApp</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
