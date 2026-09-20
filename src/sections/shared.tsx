import type { ReactNode } from 'react'

export function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
  className = '',
}: {
  id: string
  eyebrow?: string
  title: string
  desc?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {eyebrow && (
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-jev uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {desc && (
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{desc}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
