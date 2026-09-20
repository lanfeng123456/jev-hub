import { useI18n } from '../i18n'
import { Section } from './shared'

const guides = [
  { slug: 'jev-api', en: 'Jev API tutorial', zh: 'Jev API 接入教程', enDesc: 'A verified request shape, server-side example, and errors explained.', zhDesc: '官方接口结构、服务端示例与常见报错排查。' },
  { slug: 'jev-access', en: 'Download & official access', zh: '下载与官方访问申请', enDesc: 'Find the console, understand the waitlist, and distinguish SDKs from model weights.', zhDesc: '找到官方控制台，理解候补状态与 SDK、模型权重的区别。' },
  { slug: 'jev-pricing', en: 'Pricing & token costs', zh: '价格与 Token 费用', enDesc: 'Worked cost estimates and what to include in a production budget.', zhDesc: '用具体计算示例理解费用，以及完整工作流的成本。' },
  { slug: 'jev-benchmarks', en: 'Benchmarks & limitations', zh: '性能评测与能力边界', enDesc: 'Read vendor claims in context and plan a fair evaluation of your own.', zhDesc: '理解官方评测的条件，设计自己的业务验证。' },
]

export default function Guides() {
  const { lang } = useI18n()
  const base = lang === 'zh' ? '/zh/guides/' : '/guides/'
  return (
    <Section id="guides" eyebrow="Jev Guides" title={lang === 'zh' ? '继续探索：Jev 使用指南' : 'Go deeper with Jev guides'} desc={lang === 'zh' ? '从申请访问到评估上线，每篇均附官方来源。' : 'From access to evaluation, with official sources in every guide.'}>
      <div className="grid gap-4 md:grid-cols-2">
        {guides.map(g => <a key={g.slug} href={`${base}${g.slug}/`} className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-jev/60">
          <h3 className="text-lg font-semibold group-hover:text-jev">{g[lang]}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lang === 'zh' ? g.zhDesc : g.enDesc}</p>
          <span className="mt-5 inline-block font-mono text-xs text-jev">{lang === 'zh' ? '阅读指南' : 'Read guide'} →</span>
        </a>)}
      </div>
      <a href={base} className="mt-6 inline-block text-sm text-jev underline underline-offset-4">{lang === 'zh' ? '查看全部指南' : 'Browse all guides'} →</a>
    </Section>
  )
}
