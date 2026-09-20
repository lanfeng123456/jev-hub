import { Section } from './shared'
import { Youtube, ExternalLink, Tv } from 'lucide-react'
import { useI18n } from '../i18n'
import { BILIBILI_VIDEO, X_POSTS, YT_VIDEOS, formatCount, statText } from '../data/videos'

export default function VideoWall() {
  const { lang, t } = useI18n()
  return (
    <Section
      id="videos"
      eyebrow={t.videos.eyebrow}
      title={t.videos.title}
      desc={t.videos.desc}
    >
      {/* YouTube */}
      <div className="mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        <Youtube className="h-4 w-4 text-jev" /> YouTube
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {YT_VIDEOS.map((v) => (
          <figure key={v.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <figcaption className="p-3">
              <p className="line-clamp-2 text-sm font-medium">{v.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {v.author} · <span className="font-mono text-jev/80">{statText(v.stat, lang)}</span>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Bilibili */}
      <div className="mt-10 mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        <Tv className="h-4 w-4 text-jev" /> Bilibili
      </div>
      <div className="max-w-2xl">
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="aspect-video">
            <iframe
              src={`https://player.bilibili.com/player.html?bvid=${BILIBILI_VIDEO.bvid}&autoplay=0`}
              title={BILIBILI_VIDEO.title}
              loading="lazy"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <figcaption className="p-3">
            <p className="text-sm font-medium">{BILIBILI_VIDEO.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {BILIBILI_VIDEO.author} ·{' '}
              <span className="font-mono text-jev/80">
                {lang === 'zh'
                  ? `约 ${formatCount(BILIBILI_VIDEO.views, lang)} 播放`
                  : `~${formatCount(BILIBILI_VIDEO.views, lang)} views`}
              </span>
            </p>
          </figcaption>
        </figure>
      </div>

      {/* X posts */}
      <div className="mt-10 mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        <ExternalLink className="h-4 w-4 text-jev" /> {t.videos.xHeading}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {X_POSTS.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-jev/50"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-bold">𝕏</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-jev" />
            </div>
            <p className="mt-3 text-sm font-medium">{p.title[lang]}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.author}</p>
            <p className="mt-3 font-mono text-xs text-jev">{statText(p.stat, lang)}</p>
          </a>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">{t.videos.footnote}</p>
    </Section>
  )
}
