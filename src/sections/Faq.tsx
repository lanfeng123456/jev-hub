import { Section } from './shared'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useI18n } from '../i18n'

export default function Faq() {
  const { t } = useI18n()
  return (
    <Section id="faq" eyebrow={t.faq.eyebrow} title={t.faq.title}>
      <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-6">
        {t.faq.items.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-sm font-medium hover:text-jev hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
