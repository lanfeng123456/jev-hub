import {
  createContext,
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

export const SUPPORTED_LANGS: readonly Lang[] = ['zh', 'en']

const DICTS: Record<Lang, Messages> = { zh, en }

export const LANG_LABELS: Record<Lang, string> = { zh: '中文', en: 'EN' }

const STORAGE_KEY = 'jev-lang'
const DEFAULT_LANG: Lang = 'zh'

// ── Detection ──────────────────────────────────────────────────────────
// Manual choice (localStorage) wins. Otherwise: zh* → Chinese, everything
// else → English for now. If detection is unavailable, fall back to Chinese.
function detectInitialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
      return saved as Lang
    }
  } catch {
    // localStorage unavailable — continue with detection
  }
  const navLang =
    typeof navigator !== 'undefined'
      ? navigator.language || (navigator.languages && navigator.languages[0]) || ''
      : ''
  if (!navLang) return DEFAULT_LANG
  return navLang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

// ── Context ────────────────────────────────────────────────────────────
interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore persistence failures
    }
  }

  const t = DICTS[lang]

  // Keep <html lang> and <title> in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang
    document.title = t.meta.title
  }, [t])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <LanguageProvider>')
  return ctx
}
