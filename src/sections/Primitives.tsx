import { Section } from './shared'
import { ListChecks, SlidersHorizontal, ToggleLeft, Layers } from 'lucide-react'
import { useI18n } from '../i18n'

const NAMES = ['Choice', 'Score', 'Noul']
const ICONS = [ListChecks, SlidersHorizontal, ToggleLeft]

export default function Primitives() {
  const { t } = useI18n()
  return (
    <Section
      id="primitives"
      eyebrow={t.primitives.eyebrow}
      title={t.primitives.title}
      desc={t.primitives.desc}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {t.primitives.items.map((p, i) => {
          const Icon = ICONS[i]
          const name = NAMES[i]
          return (
            <div
              key={name}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-jev/40"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-jev" />
                <span className="rounded border border-jev/30 px-2 py-0.5 font-mono text-xs text-jev">
                  {name}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                {p.cn} <span className="font-mono text-sm text-muted-foreground">/ {name}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-4 rounded-lg bg-background/80 p-3 font-mono text-xs leading-relaxed text-jev/90">
                {p.example}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-card p-5">
        <Layers className="mt-0.5 h-5 w-5 shrink-0 text-jev" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">{t.primitives.comboStrong}</span>{' '}
          {t.primitives.comboText}
        </p>
      </div>
    </Section>
  )
}
