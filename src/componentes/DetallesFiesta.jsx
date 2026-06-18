import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, Clock as ClockIcon, MapPin as MapPinIcon, Crown as CrownIcon } from 'lucide-react'
import estilos from './DetallesFiesta.module.css'

export default function DetallesFiesta({ ubicacion, fechaEvento }) {
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = fechaEvento - Date.now()
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
  }, [fechaEvento])

  return (
    <section className={estilos.seccion}>
      <div className={estilos.fondoDecorativo}>
        <img src="/paleta/pngwing.com.png" alt="" className={estilos.decoracionTop} />
        <img src="/paleta/pngegg (12).png" alt="" className={estilos.decoracionBottom} />
      </div>

      <div className={estilos.contenido}>
        <CrownIcon className="anim-brillar" style={{ width: 28, height: 28, color: 'var(--oro-claro)', opacity: 0.6 }} />
        <p className={estilos.textoIntro}>El palacio esta de fiesta</p>
        <h2 className={estilos.titulo}>porque nuestra princesa</h2>
        <p className={estilos.edad}>cumple 2 anitos</p>

        <div className={estilos.tarjetas}>
          <div className={estilos.tarjeta}>
            <div className={estilos.iconoTarjeta}><CalendarIcon /></div>
            <div>
              <p className={estilos.labelTarjeta}>Fecha</p>
              <p className={estilos.valorTarjeta}>Domingo 28 de Junio</p>
            </div>
          </div>
          <div className={estilos.tarjeta}>
            <div className={estilos.iconoTarjeta}><ClockIcon /></div>
            <div>
              <p className={estilos.labelTarjeta}>Hora</p>
              <p className={estilos.valorTarjeta}>17:00 hs</p>
            </div>
          </div>
          <div className={estilos.tarjeta}>
            <div className={estilos.iconoTarjeta}><MapPinIcon /></div>
            <div>
              <p className={estilos.labelTarjeta}>Lugar</p>
              <p className={estilos.valorTarjeta}>{ubicacion.nombre}</p>
            </div>
          </div>
        </div>

        <div className={estilos.countdown}>
          <div className={estilos.bloqueCountdown}>
            <span className={estilos.numCountdown}>{String(countdown.d).padStart(2, '0')}</span>
            <span className={estilos.unitCountdown}>dias</span>
          </div>
          <span className={estilos.sepCountdown}>:</span>
          <div className={estilos.bloqueCountdown}>
            <span className={estilos.numCountdown}>{String(countdown.h).padStart(2, '0')}</span>
            <span className={estilos.unitCountdown}>horas</span>
          </div>
          <span className={estilos.sepCountdown}>:</span>
          <div className={estilos.bloqueCountdown}>
            <span className={estilos.numCountdown}>{String(countdown.m).padStart(2, '0')}</span>
            <span className={estilos.unitCountdown}>min</span>
          </div>
          <span className={estilos.sepCountdown}>:</span>
          <div className={estilos.bloqueCountdown}>
            <span className={estilos.numCountdown}>{String(countdown.s).padStart(2, '0')}</span>
            <span className={estilos.unitCountdown}>seg</span>
          </div>
        </div>
      </div>
    </section>
  )
}
