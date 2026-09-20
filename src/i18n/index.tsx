import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { zh, type Messages } from './zh'
import { en } from './en'

// ── Supported languages ────────────────────────────────────────────────
// To add Japanese later: create src/i18n/ja.ts satisfying `Messages`,
// then add 'ja' to Lang, SUPPORTED_LANGS, DICTS and LANG_LABELS.
export type Lang = 'zh' | 'en'

// Shared with the language switcher; safe to retain alongside the provider.
// eslint-disable-next-line react-refresh/only-export-components
export const SUPPORTED_LANGS: readonly Lang[] = ['zh', 'en']

const DICTS: Record<Lang, Messages> = { zh, en }

// eslint-disable-next-line react-refresh/only-export-components
export const LANG_LABELS: Record<Lang, string> = { zh: '中文', en: 'EN' }

const DEFAULT_LANG: Lang = 'zh'

// ── Detection ──────────────────────────────────────────────────────────
// The URL owns the language so crawlers and visitors see the same localized page.
// `/` is Chinese and `/en/` is English; unknown paths fall back to Chinese.
function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  return window.location.pathname === '/en' || window.location.pathname.startsWith('/en/') ? 'en' : 'zh'
}

// ── Context ────────────────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang] = useState<Lang>(detectInitialLang)

  const setLang = useCallback((next: Lang) => {
    if (next === lang) return
    window.location.assign(`${next === 'en' ? '/en/' : '/'}${window.location.hash}`)
  }, [lang])

  const t = DICTS[lang]

  // Keep <html lang> and <title> in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang
    document.title = t.meta.title
  }, [t])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// The hook and provider intentionally share one context instance.
// eslint-disable-next-line react-refresh/only-export-components
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <LanguageProvider>')
  return ctx
}
