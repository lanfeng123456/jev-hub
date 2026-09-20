import { useI18n } from '../i18n'

export default function HeroAd() {
  const { lang } = useI18n()
  const label = lang === 'zh' ? '广告' : 'Advertisement'

  return (
    <aside className="hero-ad ad-placement" aria-label={label}>
      <span className="ad-label">{label}</span>
      <div id="container-d93522345fe7fd01c719b5d879c19138" data-native-ad />
    </aside>
  )
}
