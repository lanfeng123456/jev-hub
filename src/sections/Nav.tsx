import { useEffect, useState } from 'react'
import { Terminal } from 'lucide-react'
import { LANG_LABELS, SUPPORTED_LANGS, useI18n } from '../i18n'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-jev text-background">
            <Terminal className="h-4 w-4" />
          </span>
          <span>
            <span className="text-jev">Jev</span>
            <span className="ml-2 hidden text-muted-foreground sm:inline">
              {t.nav.brandSuffix}
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {t.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-jev"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language / 语言"
            className="flex items-center rounded-md border border-border p-0.5 font-mono text-xs"
          >
            {SUPPORTED_LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded px-2 py-1 transition-colors ${
                  lang === l
                    ? 'bg-jev font-semibold text-background'
                    : 'text-muted-foreground hover:text-jev'
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
          <a
            href="#quickstart"
            className="rounded-md border border-jev/40 px-3 py-1.5 font-mono text-xs text-jev transition-colors hover:bg-jev hover:text-background"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
