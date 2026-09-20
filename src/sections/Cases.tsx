import { Section } from './shared'
import { TerminalSquare, Plane, GitPullRequest, Boxes, FlaskConical, MailWarning } from 'lucide-react'
import { useI18n } from '../i18n'

const ICONS = [TerminalSquare, Plane, GitPullRequest, Boxes, FlaskConical, MailWarning]

export default function Cases() {
  const { t } = useI18n()
  return (
    <Section
      id="cases"
      eyebrow={t.cases.eyebrow}
      title={t.cases.title}
      desc={t.cases.desc}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.cases.items.map((c, i) => {
          const Icon = ICONS[i]
          return (
            <div
              key={c.title}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-jev/40"
            >
              <Icon className="h-6 w-6 text-jev" />
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-3 font-mono text-2xl font-bold text-jev">{c.stat}</p>
              <p className="font-mono text-xs text-muted-foreground">{c.statLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
