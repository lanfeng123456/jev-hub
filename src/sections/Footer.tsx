import { Terminal, ExternalLink } from 'lucide-react'
import { useI18n } from '../i18n'
import { SOURCE_LINKS } from '../data/videos'

export default function Footer() {
  const { lang, t } = useI18n()
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-sm font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-jev text-background">
                <Terminal className="h-4 w-4" />
              </span>
              <span>
                <span className="text-jev">Jev</span> {t.footer.brandSuffix}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t.footer.disclaimerPre}
              <span className="text-foreground">{t.footer.disclaimerStrong}</span>
              {t.footer.disclaimerMid}
              <span className="font-mono text-jev"> 2026-09-20</span>
              {t.footer.disclaimerPost}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {t.footer.sourcesTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {SOURCE_LINKS.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 text-sm text-muted-foreground transition-colors hover:text-jev"
                  >
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {s.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center font-mono text-xs text-muted-foreground">
          {t.footer.bottom}
        </div>
      </div>
    </footer>
  )
}
