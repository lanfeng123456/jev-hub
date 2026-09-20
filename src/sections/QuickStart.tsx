import { Section } from './shared'
import { Lightbulb } from 'lucide-react'
import { useI18n } from '../i18n'

export default function QuickStart() {
  const { t } = useI18n()
  return (
    <Section
      id="quickstart"
      eyebrow={t.quickstart.eyebrow}
      title={t.quickstart.title}
      desc={t.quickstart.desc}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {t.quickstart.steps.map((s) => (
          <div key={s.n} className="rounded-xl border border-border bg-card p-5">
            <p className="font-mono text-2xl font-bold text-jev/60">{s.n}</p>
            <h3 className="mt-2 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{t.quickstart.codeFile}</span>
          <span className="rounded border border-jev/30 px-2 py-0.5 font-mono text-[10px] text-jev">
            {t.quickstart.codeBadge}
          </span>
        </div>
        <pre className="overflow-x-auto bg-background/90 p-4 text-[13px] leading-relaxed">
          <code className="font-mono text-foreground/90">{t.quickstart.code}</code>
        </pre>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-jev" />
          <h3 className="font-semibold">{t.quickstart.tipsTitle}</h3>
        </div>
        <ul className="mt-4 space-y-3">
          {t.quickstart.tips.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jev" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
