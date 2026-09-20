import { Section } from './shared'
import { Brain, Zap, GitBranch, CalendarDays } from 'lucide-react'
import { useI18n } from '../i18n'

const CARD_ICONS = [Brain, Zap, GitBranch]

export default function Overview() {
  const { t } = useI18n()
  return (
    <Section
      id="overview"
      eyebrow={t.overview.eyebrow}
      title={t.overview.title}
      desc={t.overview.desc}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {t.overview.cards.map((c, i) => {
          const Icon = CARD_ICONS[i]
          return (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="mb-4 h-6 w-6 text-jev" />
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-jev/25 bg-jev/5 p-5">
        <CalendarDays className="h-5 w-5 shrink-0 text-jev" />
        <p className="text-sm leading-relaxed">
          <span className="font-mono font-semibold text-jev">2026-09-15</span>
          <span className="text-muted-foreground">{t.overview.bannerPre}</span>
          <span className="font-mono font-semibold text-jev">$40M</span>
          <span className="text-muted-foreground">{t.overview.bannerPost}</span>
        </p>
      </div>
    </Section>
  )
}
