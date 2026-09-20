import type { Lang } from '../i18n'

// ── Shared data: numbers, URLs and embed IDs live here exactly once. ────
// Only caption/description strings are per-language ({ zh, en } pairs).
// View counts are snapshots from around 2026-09-19.

export type LocalText = Record<Lang, string>

export type VideoStat =
  | {
      kind: 'views'
      views: number
      plus?: boolean // "180 万+" style
      later?: number // count it later rose to
      likes?: number
      note?: LocalText
    }
  | { kind: 'custom'; text: LocalText }

export interface YtVideo {
  id: string // YouTube embed ID
  title: string // original title — never translated
  author: string // channel name — never translated
  stat: VideoStat
}

export interface XPost {
  title: LocalText // descriptive caption (not an original title)
  author: string
  url: string
  stat: VideoStat
}

export interface BilibiliVideo {
  bvid: string
  title: string // original title — never translated
  author: string
  views: number
}

export interface SourceLink {
  label: LocalText
  url: string
}

// ── Count formatting ───────────────────────────────────────────────────
function trim1(n: number): string {
  const v = Math.round(n * 10) / 10
  return Number.isInteger(v) ? String(v) : v.toFixed(1)
}

export function formatCount(n: number, lang: Lang): string {
  if (lang === 'zh') {
    if (n >= 10000) return `${trim1(n / 10000)} 万`
    return String(n)
  }
  if (n >= 1_000_000) return `${trim1(n / 1_000_000)}M`
  if (n >= 1_000) return `${trim1(n / 1_000)}K`
  return String(n)
}

export function statText(stat: VideoStat, lang: Lang): string {
  if (stat.kind === 'custom') return stat.text[lang]
  const count = formatCount(stat.views, lang)
  let s =
    lang === 'zh'
      ? `约 ${count}${stat.plus ? '+' : ''} 播放`
      : `~${count}${stat.plus ? '+' : ''} views`
  if (stat.later) {
    s +=
      lang === 'zh'
        ? `（后涨至约 ${formatCount(stat.later, lang)}）`
        : ` (later ~${formatCount(stat.later, lang)})`
  }
  if (stat.likes) {
    s +=
      lang === 'zh'
        ? ` · ${formatCount(stat.likes, lang)} 赞`
        : ` · ${formatCount(stat.likes, lang)} likes`
  }
  if (stat.note) s += lang === 'zh' ? ` · ${stat.note.zh}` : ` · ${stat.note.en}`
  return s
}

// ── YouTube ────────────────────────────────────────────────────────────
export const YT_VIDEOS: YtVideo[] = [
  {
    id: '2Bs0Ink_-Uo',
    title: 'JEV Breakdown: The First AI Model Built For Code',
    author: 'Rob Shocks',
    stat: {
      kind: 'views',
      views: 336000,
      note: { zh: '全站最高', en: 'most-viewed overall' },
    },
  },
  {
    id: 'QbYBRjOaGOo',
    title: 'wtf is jev?',
    author: 'Syntax',
    stat: { kind: 'views', views: 178000, later: 350000 },
  },
  {
    id: 'X117w2Rark8',
    title: 'Jev - The Ultimate Classification Model?',
    author: 'Sam Witteveen',
    stat: { kind: 'views', views: 117000 },
  },
  {
    id: 'qdji39XXgEY',
    title: 'Jev From TypeSafe is a New Class of AI Model that is FAST and CHEAP',
    author: 'Gary Explains',
    stat: { kind: 'views', views: 23000 },
  },
  {
    id: 'X8Outd-khS0',
    title: "Jev: The Model That Killed Chat GPT's Core Idea? RLCD Explained",
    author: 'Fahd Mirza',
    stat: { kind: 'custom', text: { zh: '发布日 quick take', en: 'Launch-day quick take' } },
  },
  {
    id: 'Nq_lu5QT-fI',
    title: "Jev: The New AI Model That's Breaking The Internet (Full Tutorial)",
    author: 'The Prompt Warrior',
    stat: { kind: 'custom', text: { zh: '完整教程', en: 'Full tutorial' } },
  },
  {
    id: 'FQFKZiDOYAM',
    title: '爆火的 TypeSafe AI Jev 模型到底怎么玩？',
    author: 'kate人不错（中文）',
    stat: { kind: 'custom', text: { zh: '中文讲解', en: 'Chinese-language walkthrough' } },
  },
  {
    id: 'GJJq4LXHtW4',
    title: '超火大模型Jev，保姆级介绍和使用教程',
    author: '01Coder（中文）',
    stat: { kind: 'custom', text: { zh: '中文教程', en: 'Chinese-language tutorial' } },
  },
]

// ── Bilibili ───────────────────────────────────────────────────────────
export const BILIBILI_VIDEO: BilibiliVideo = {
  bvid: 'BV15ieC6TE2f',
  title: '爆火的 TypeSafe AI Jev 模型到底怎么玩？',
  author: 'kate人不错',
  views: 15000,
}

// ── X / Twitter ────────────────────────────────────────────────────────
export const X_POSTS: XPost[] = [
  {
    title: { zh: '官方发布影片', en: 'Official launch film' },
    author: 'Diogo Almeida',
    url: 'https://x.com/CompleteSkeptic/status/2099925575637057536',
    stat: { kind: 'views', views: 37200000, likes: 72000 },
  },
  {
    title: { zh: 'Browser Use + Jev：7 秒订机票', en: 'Browser Use + Jev: flight booked in 7s' },
    author: 'Gregor Zunic',
    url: 'https://x.com/gregpr07/status/2100411066966749359',
    stat: { kind: 'views', views: 1800000, plus: true },
  },
  {
    title: { zh: '魔方自解', en: "Self-solving Rubik's cube" },
    author: 'Paolo Rosson',
    url: 'https://x.com/redp314/status/2100489858951073858',
    stat: { kind: 'views', views: 204000 },
  },
  {
    title: { zh: 'Jev 审查我的 PR', en: 'Jev reviews my PR' },
    author: 'Paolo Rosson',
    url: 'https://x.com/redp314/status/2100585126652481915',
    stat: { kind: 'views', views: 331000 },
  },
]

// ── Footer sources ─────────────────────────────────────────────────────
export const SOURCE_LINKS: SourceLink[] = [
  {
    label: {
      zh: 'TypeSafe AI 官方博客：Introducing System One Models and Jev',
      en: 'TypeSafe AI official blog: Introducing System One Models and Jev',
    },
    url: 'https://typesafe.ai/blog/introducing-system-one-models-and-jev',
  },
  {
    label: { zh: 'TechCrunch 相关报道', en: 'TechCrunch coverage' },
    url: 'https://techcrunch.com',
  },
  {
    label: {
      zh: 'YouTube：Rob Shocks / Syntax / Sam Witteveen / Gary Explains / Fahd Mirza / The Prompt Warrior',
      en: 'YouTube: Rob Shocks / Syntax / Sam Witteveen / Gary Explains / Fahd Mirza / The Prompt Warrior',
    },
    url: 'https://www.youtube.com',
  },
  {
    label: { zh: '中文视频：kate人不错 / 01Coder', en: 'Chinese-language videos: kate人不错 / 01Coder' },
    url: 'https://www.bilibili.com',
  },
  {
    label: {
      zh: 'X：Diogo Almeida / Gregor Zunic / Paolo Rosson / Rafal Wilinski',
      en: 'X: Diogo Almeida / Gregor Zunic / Paolo Rosson / Rafal Wilinski',
    },
    url: 'https://x.com',
  },
]
