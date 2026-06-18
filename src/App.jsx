import { useCallback, useRef, useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './App.modulo.css'
import {
  Heart as HeartIcon,
  Star as StarIcon,
  BookOpen as BookIcon,
  Castle as CastleIcon,
  TreePine as TreeIcon,
  Flower2 as FlowerIcon,
  Crown as CrownIcon,
} from 'lucide-react'
import HeaderMagico from './componentes/HeaderMagico'
import MarcoFoto from './componentes/MarcoFoto'
import DetallesFiesta from './componentes/DetallesFiesta'
import ReproductorAudio from './componentes/ReproductorAudio'

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
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [showForm, setShowForm] = useState(false)
  const [tipo, setTipo] = useState('individual')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [familiaNombre, setFamiliaNombre] = useState('')
  const [cantidad, setCantidad] = useState('')

  const initMap = useCallback(() => {
    if (mapInstanceRef.current) return
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude
        const userLng = pos.coords.longitude
        if (!mapRef.current) return
        const map = L.map(mapRef.current, { zoomControl: false }).setView([userLat, userLng], 14)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
        L.marker([userLat, userLng]).addTo(map).bindPopup('Tu ubicacion').openPopup()
        L.marker([UBICACION.lat, UBICACION.lng]).addTo(map).bindPopup(UBICACION.nombre).openPopup()
        mapInstanceRef.current = map
        setTimeout(() => map.invalidateSize(), 300)
      },
      () => {
        if (!mapRef.current) return
        const map = L.map(mapRef.current, { zoomControl: false }).setView([UBICACION.lat, UBICACION.lng], 14)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
        L.marker([UBICACION.lat, UBICACION.lng]).addTo(map).bindPopup(UBICACION.nombre).openPopup()
        mapInstanceRef.current = map
        setTimeout(() => map.invalidateSize(), 300)
      }
    )
  }, [])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { initMap(); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(mapRef.current)
    return () => obs.disconnect()
  }, [initMap])

  const abrirFormulario = useCallback(() => setShowForm(true), [])
  const cerrarFormulario = useCallback(() => setShowForm(false), [])

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
    <div className="app">
      <ReproductorAudio />

      <HeaderMagico imgSrc={IMG[0]} />

      <MarcoFoto
        src={IMG[1]}
        alt="Nacia Delfina"
        zoom
        iconoDecorativo={BookIcon}
        decoracionTopSrc="/paleta/pngegg (12).png"
      >
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#f5efe0', textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
          Habia una vez, en un reino no muy lejano, hace no mucho tiempo, un Rey y una Reina que anhelaban una hija
        </p>
      </MarcoFoto>

      <MarcoFoto
        src={IMG[2]}
        alt="Nacia Delfina"
        iconoDecorativo={CastleIcon}
        decoracionBottomSrc="/paleta/pngwing.com.png"
      >
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#f5efe0', textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
          Un dia, su deseo fue cumplido y fueron bendecidos con una hermosa nina que llamaron{' '}
          <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, color: '#ffd700', fontSize: '1.5rem' }}>
            Nacia Delfina
          </span>
        </p>
      </MarcoFoto>

      <MarcoFoto
        src={IMG[3]}
        alt="Nacia Delfina"
        filaIconos={<><TreeIcon /><FlowerIcon /><TreeIcon /></>}
        decoracionTopSrc="/paleta/5874d03542e4d628738559ed.png"
      >
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#f5efe0', textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
          El tiempo volo y la princesa crecio, llenando cada dia de magia y alegria
        </p>
      </MarcoFoto>

      <DetallesFiesta ubicacion={UBICACION} fechaEvento={FECHA_EVENTO} />

      <section style={{
        position: 'relative', width: '100%', minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '40px 20px 40px', gap: 12,
        background: `linear-gradient(180deg, #0d2818 0%, #1a4a2a 50%, #0d2818 100%)`,
        backgroundImage: `
          radial-gradient(ellipse at 30% 20%, rgba(196,30,58,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(26,60,143,0.04) 0%, transparent 50%),
          linear-gradient(180deg, #0d2818 0%, #1a4a2a 50%, #0d2818 100%)
        `,
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          position: 'relative', zIndex: 2, width: '100%', maxWidth: 380
        }}>
          <HeartIcon style={{ width: 28, height: 28, color: 'var(--rojo-claro)', opacity: 0.7 }} className="anim-latir" />
          <h2 style={{
            fontFamily: "'Dancing Script', cursive", fontSize: '2.4rem', fontWeight: 700,
            color: '#ffd700', textAlign: 'center', textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.1)'
          }}>
            Confirma tu presencia
          </h2>
          <p style={{ fontSize: '1rem', color: '#f5efe0', textAlign: 'center', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
            Decinos si venis para esperarte con todo el amor
          </p>
          <button onClick={abrirFormulario} style={{
            width: '100%', maxWidth: 300, padding: '18px 32px', border: 'none', borderRadius: 50,
            fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '1.05rem',
            background: 'linear-gradient(135deg, #c41e3a, #8b0000)',
            color: '#f5efe0', cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(196,30,58,0.3)',
            letterSpacing: '0.5px', transition: 'transform 0.2s'
          }}>
            Confirmar Asistencia
          </button>

          <div style={{
            position: 'relative', width: '100%',
            maxWidth: 360, height: 320, borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
            border: '2px solid rgba(212,160,23,0.15)',
            marginTop: 10
          }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      <footer style={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, padding: '40px 24px 36px', textAlign: 'center',
        borderTop: '1px solid rgba(212,160,23,0.15)', background: '#0d2818'
      }}>
        <div style={{ display: 'flex', gap: 8, color: 'rgba(255,215,0,0.5)', marginBottom: 6 }}>
          <StarIcon /><StarIcon />
        </div>
        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', fontWeight: 600, color: '#ffeaa7' }}>
          Nacia Delfina
        </p>
        <p style={{ fontSize: '0.95rem', color: 'rgba(245,239,224,0.35)' }}>2 añitos</p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(245,239,224,0.2)', marginTop: 4 }}>
          Gracias por ser parte de este sueno
        </p>
      </footer>

      {showForm && (
        <div onClick={cerrarFormulario} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'flex-end', zIndex: 100,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', maxWidth: 480, margin: '0 auto',
            background: 'linear-gradient(180deg, #1a4a2a, #0d2818)',
            borderRadius: '24px 24px 0 0', padding: '28px 20px 40px',
            display: 'flex', flexDirection: 'column', gap: 14, position: 'relative',
            borderTop: '2px solid rgba(212,160,23,0.15)'
          }}>
            <button onClick={cerrarFormulario} style={{
              position: 'absolute', top: 16, right: 20,
              background: 'none', border: 'none', color: 'rgba(245,239,224,0.4)',
              fontSize: '1.4rem', cursor: 'pointer', fontFamily: "'Fredoka', sans-serif"
            }}>x</button>
            <h2 style={{
              fontFamily: "'Dancing Script', cursive", fontSize: '1.8rem', fontWeight: 700,
              color: '#ffd700', textAlign: 'center', marginBottom: 4
            }}>Confirmar Asistencia</h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setTipo('individual')} style={{
                flex: 1, padding: 12, border: `2px solid ${tipo === 'individual' ? '#c41e3a' : 'rgba(212,160,23,0.15)'}`,
                borderRadius: 12, background: tipo === 'individual' ? 'rgba(196,30,58,0.12)' : 'rgba(255,255,255,0.03)',
                fontFamily: "'Fredoka', sans-serif", color: '#f5efe0', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer'
              }}>Individual</button>
              <button onClick={() => setTipo('familia')} style={{
                flex: 1, padding: 12, border: `2px solid ${tipo === 'familia' ? '#c41e3a' : 'rgba(212,160,23,0.15)'}`,
                borderRadius: 12, background: tipo === 'familia' ? 'rgba(196,30,58,0.12)' : 'rgba(255,255,255,0.03)',
                fontFamily: "'Fredoka', sans-serif", color: '#f5efe0', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer'
              }}>Familia</button>
            </div>
            {tipo === 'individual' ? (
              <>
                <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid rgba(212,160,23,0.15)',
                    borderRadius: 12, background: 'rgba(255,255,255,0.03)', fontFamily: "'Patrick Hand', cursive",
                    color: '#f5efe0', fontSize: '1rem', outline: 'none' }} />
                <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid rgba(212,160,23,0.15)',
                    borderRadius: 12, background: 'rgba(255,255,255,0.03)', fontFamily: "'Patrick Hand', cursive",
                    color: '#f5efe0', fontSize: '1rem', outline: 'none' }} />
              </>
            ) : (
              <>
                <input placeholder="Nombre de la familia" value={familiaNombre} onChange={(e) => setFamiliaNombre(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid rgba(212,160,23,0.15)',
                    borderRadius: 12, background: 'rgba(255,255,255,0.03)', fontFamily: "'Patrick Hand', cursive",
                    color: '#f5efe0', fontSize: '1rem', outline: 'none' }} />
                <input type="number" placeholder="Cantidad de integrantes" value={cantidad} onChange={(e) => setCantidad(e.target.value)} min="1"
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid rgba(212,160,23,0.15)',
                    borderRadius: 12, background: 'rgba(255,255,255,0.03)', fontFamily: "'Patrick Hand', cursive",
                    color: '#f5efe0', fontSize: '1rem', outline: 'none' }} />
              </>
            )}
            <button onClick={enviarConfirmacion} style={{
              width: '100%', padding: '18px 32px', border: 'none', borderRadius: 50,
              fontFamily: "'Fredoka', sans-serif", fontWeight: 600, fontSize: '1.05rem',
              background: 'linear-gradient(135deg, #c41e3a, #8b0000)',
              color: '#f5efe0', cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(196,30,58,0.3)', marginTop: 4
            }}>
              Enviar por WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
