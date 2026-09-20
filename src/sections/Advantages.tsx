import { Section } from './shared'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Gauge, PiggyBank, ShieldCheck, Target, MailCheck } from 'lucide-react'
import { useI18n } from '../i18n'

const CARD_ICONS = [Gauge, PiggyBank, ShieldCheck, Target]

export default function Advantages() {
  const { t } = useI18n()
  return (
    <Section
      id="advantages"
      eyebrow={t.advantages.eyebrow}
      title={t.advantages.title}
      desc={t.advantages.desc}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.advantages.cards.map((c, i) => {
          const Icon = CARD_ICONS[i]
          return (
            <div key={c.title} className="rounded-xl border border-border bg-card p-5">
              <Icon className="mb-3 h-6 w-6 text-jev" />
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-card hover:bg-card">
              <TableHead className="w-28 text-muted-foreground">
                {t.advantages.table.dimHead}
              </TableHead>
              <TableHead className="font-mono text-jev">{t.advantages.table.jevHead}</TableHead>
              <TableHead className="text-muted-foreground">
                {t.advantages.table.llmHead}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {t.advantages.table.rows.map(([dim, jev, llm]) => (
              <TableRow key={dim} className="border-border">
                <TableCell className="font-medium text-muted-foreground">{dim}</TableCell>
                <TableCell className="text-foreground">{jev}</TableCell>
                <TableCell className="text-muted-foreground">{llm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 rounded-xl border border-jev/30 bg-gradient-to-br from-jev/10 to-transparent p-6">
        <div className="flex items-center gap-2">
          <MailCheck className="h-5 w-5 text-jev" />
          <h3 className="font-semibold">{t.advantages.spam.title}</h3>
        </div>
        <div className="mt-4 grid gap-3 font-mono text-sm md:grid-cols-3">
          <div className="rounded-lg bg-background/70 p-4">
            <p className="text-jev">{t.advantages.spam.box1a}</p>
            <p className="mt-1 text-jev">{t.advantages.spam.box1b}</p>
            <p className="mt-2 text-xs text-muted-foreground">{t.advantages.spam.box1note}</p>
          </div>
          <div className="rounded-lg bg-background/70 p-4">
            <p className="text-jev">{t.advantages.spam.box2a}</p>
            <p className="mt-2 text-xs text-muted-foreground">{t.advantages.spam.box2note}</p>
          </div>
          <div className="flex flex-col justify-center rounded-lg bg-background/70 p-4 text-center">
            <p className="text-3xl font-bold text-jev">99.5%</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.advantages.spam.box3label}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{t.advantages.spam.footnote}</p>
      </div>
    </Section>
  )
}
