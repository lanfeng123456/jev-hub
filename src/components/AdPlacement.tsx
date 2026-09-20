import { useI18n } from '../i18n'

export default function AdPlacement({ unit }: { unit: 'short' | 'tall' }) {
  const { lang } = useI18n()
  const label = lang === 'zh' ? '广告' : 'Advertisement'
  return (
    <div className={`ad-placement ${unit === 'short' ? 'ad-after-content' : ''}`}>
      <span className="ad-label">{label}</span>
      <div className="ad-slot" data-ad-unit={unit} aria-label={label} />
    </div>
  )
}
