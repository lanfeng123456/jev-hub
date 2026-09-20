import { useEffect, useRef, useState } from 'react'
import { Play, Rocket } from 'lucide-react'
import { useI18n } from '../i18n'

function CountUp({
  to,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1600,
}: {
  to: number
  decimals?: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(to * eased)
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const STAT_VALUES = [
  <CountUp key="latency" to={500} suffix="ms" />,
  <CountUp key="output" to={0} />,
  <CountUp key="errors" to={0} />,
  <CountUp key="seed" to={40} prefix="$" suffix="M" />,
]

export default function Hero() {
  const { t } = useI18n()
  return (
    <section id="top" className="grid-bg relative overflow-hidden pt-14">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, hsl(var(--jev)), transparent)' }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center md:px-6 md:py-36">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-jev/30 bg-jev/5 px-4 py-1 font-mono text-xs text-jev">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-jev" />
          {t.hero.badge}
        </p>
        <h1 className="text-7xl font-black tracking-tighter md:text-9xl">
          <span className="text-jev glow-jev">Jev</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl font-medium md:text-2xl">
          {t.hero.tagline}
        </p>
        <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          {t.hero.leadA}
          <span className="text-foreground">{t.hero.leadStrong}</span>
          {t.hero.leadB}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#videos"
            className="inline-flex items-center gap-2 rounded-lg bg-jev px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
          >
            <Play className="h-4 w-4" /> {t.hero.ctaVideos}
          </a>
          <a
            href="#quickstart"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-colors hover:border-jev/50 hover:text-jev"
          >
            <Rocket className="h-4 w-4" /> {t.hero.ctaQuick}
          </a>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
          {t.hero.stats.map((label, i) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card/70 p-4 backdrop-blur"
            >
              <div className="text-2xl font-bold text-jev md:text-3xl">{STAT_VALUES[i]}</div>
              <div className="mt-1 text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
