import quickstartExample from '../../content/examples/quickstart.txt?raw'
import type { Messages } from './zh'

// English dictionary. Must satisfy the `Messages` contract from zh.ts.
// Untranslated by design: Jev, TypeSafe AI, System One, Choice / Score / Noul,
// RLCD, RLHF, RLVR, API field names, video titles, channel/author names,
// and brand names (DCVC, Vercel, Browser Use, ...).
export const en: Messages = {
  meta: {
    title: 'Jev AI Guide: TypeSafe System One Decision Model | Jev Hub',
    htmlLang: 'en',
  },
  nav: {
    brandSuffix: 'System One Guide',
    links: [
      { href: '#overview', label: 'Overview' },
      { href: '#primitives', label: 'Primitives' },
      { href: '#advantages', label: 'Why Jev' },
      { href: '#quickstart', label: 'Quick Start' },
      { href: '#cases', label: 'Case Studies' },
      { href: '#videos', label: 'Videos' },
      { href: '#faq', label: 'FAQ' },
    ],
    cta: 'Early Access',
  },
  hero: {
    heading: 'System One Decision Model',
    badge: '2026-09-15 · TypeSafe AI exits stealth',
    tagline: 'The model that never writes a single word',
    leadA: "TypeSafe AI's first ",
    leadStrong: 'System One decision model',
    leadB:
      ' — it never generates text, only typed decisions with calibrated probabilities. Drop an "intelligent if statement" into your workflow.',
    ctaVideos: 'Watch the videos',
    ctaQuick: 'Quick start',
    stats: [
      'Latency ceiling (70–500ms)',
      'Output token cost (free)',
      'Type errors (impossible by construction)',
      'Seed round (led by DCVC)',
    ],
  },
  overview: {
    eyebrow: 'What is Jev',
    title: 'What is Jev?',
    desc: 'Jev is the first "System One model" from TypeSafe AI. It never generates text: you give it the current state of a task or workflow plus a set of structured questions, and it returns typed decisions with calibrated probabilities — essentially an "intelligent if statement" inside your workflow.',
    cards: [
      {
        title: 'System One, not System Two',
        desc: "Borrowing Kahneman's metaphor: System Two is slow thinking, reasoning, and long-form writing; System One is snap judgment in seconds. Chat LLMs excel at the former; Jev specializes in the latter — classification, routing, scoring, extraction, and policy checks.",
      },
      {
        title: 'LLMs are essay champions; Jev is a true/false ace',
        desc: 'Ask an essay champion a true/false question and it still has to write a paragraph that gets parsed. Jev removes text generation at the architecture level — a single parallel forward pass returns the answer and its probabilities. Fast, cheap, and never out of bounds.',
      },
      {
        title: 'From an RLHF co-inventor',
        desc: 'Founder Diogo Almeida is a former OpenAI researcher and co-inventor of RLHF (the research behind ChatGPT); co-founders are Erik Gafni and Sasha Sheng. The company spent two years building in stealth.',
      },
    ],
    bannerPre: ' — TypeSafe AI exited stealth, unveiled Jev, and disclosed a ',
    bannerPost: ' seed round led by DCVC.',
  },
  primitives: {
    eyebrow: 'Three Primitives',
    title: 'Three primitives: Choice · Score · Noul',
    desc: 'Everything Jev can do is composed from three primitives. A single call can ask multiple questions, and adding questions barely changes response time.',
    items: [
      {
        cn: 'Choose',
        desc: 'Pick one option from up to 255. Returns the chosen option, per-option probabilities, and a confidence score; an explicit "other" fallback is optional. With more than 255 candidates, use two-stage mode: score first, then choose.',
        example: '"Which team should this ticket go to?" → billing: 0.81 · tech: 0.12 · other: 0.07',
      },
      {
        cn: 'Score',
        desc: 'Place the state on an ordered 2–10 level scale described in natural language. The returned score can fall between levels (e.g. 1.4) and comes with per-level probabilities and confidence.',
        example: '"How angry is the customer? 1=calm … 5=furious" → 3.6 (P(4)=0.55, P(3)=0.31)',
      },
      {
        cn: 'Yes/No',
        desc: 'A yes/no assertion that returns a calibrated probability between 0 and 1. The name is a portmanteau of "no" and "null" — purpose-built for boolean judgment.',
        example: '"Did the customer explicitly ask for a refund?" → 0.93 (yes)',
      },
    ],
    comboStrong: 'One call, many questions.',
    comboText:
      'When handling a support ticket, for example, a single request can ask all at once: which team it belongs to (Choice), how angry the customer is (Score), and whether they explicitly demanded a refund (Noul) — with almost no change in latency.',
  },
  advantages: {
    eyebrow: 'Why Jev',
    title: 'Jev vs traditional LLMs: built for decisions',
    desc: 'An LLM\'s structured output is "generate text token by token, then parse it"; Jev removes text generation at the architecture level and produces typed results in a single parallel forward pass.',
    cards: [
      {
        title: 'Blazing fast',
        desc: 'Officially rated at 70–500ms latency — about two orders of magnitude faster than an LLM; the community has measured up to ~200x speedups on decision workloads.',
      },
      {
        title: 'Radically cheap',
        desc: 'Input at $0.042/M tokens, output tokens free; third parties report up to ~400x cost reductions on decision workloads.',
      },
      {
        title: 'Type-safe · Zero hallucination',
        desc: 'Output always stays within the predefined type space — fabricating out-of-bounds content is impossible by construction. It can still pick the wrong answer, though, so validate confidence on your own data.',
      },
      {
        title: 'Calibrated confidence',
        desc: 'RLCD training aligns stated probabilities with real accuracy: when it says 70%, that class of predictions is right about 70% of the time. Threshold-based automated routing you can trust.',
      },
    ],
    table: {
      dimHead: 'Dimension',
      jevHead: 'Jev',
      llmHead: 'Traditional LLM',
      rows: [
        ['Training method', 'RLCD (calibrated-decision reinforcement learning)', 'RLHF / RLVR'],
        ['Output', 'Type-safe structured values, never out of bounds', 'Strings that need JSON Schema / function calling to parse'],
        ['Latency', '70–500ms', 'Seconds'],
        ['Cost', 'Input $0.042/M tokens, output free', 'Billed per output token'],
        ['Type errors', '0 (impossible by construction)', 'Low, but non-zero'],
        ['Confidence', 'Calibrated probabilities: 70% means ~70% correct', 'Often overconfident'],
        ['Best for', 'Automated decisions: classification / routing / scoring / extraction / policy checks', 'Open-ended generation: writing / conversation / code'],
      ] as [string, string, string][],
    },
    spam: {
      title: 'By the numbers: spam triage example',
      box1a: 'score < 0.1 → 0.1% spam',
      box1b: 'score > 0.9 → 99.9% spam',
      box1note: 'Both ends handled automatically',
      box2a: '0.5–0.6 → 38% spam',
      box2note: 'Only the 0.3–0.7 band (4.6% of mail) goes to human review',
      box3label: 'Overall accuracy',
      footnote:
        'Calibrated probabilities turn "automate the extremes, escalate the middle" into a quantifiable engineering decision, not a gut call.',
    },
  },
  quickstart: {
    eyebrow: 'Quick Start',
    title: 'Quick start: integrate in four steps',
    desc: 'Jev is closed-source and only available as a hosted API. Integrating it is as simple as calling a REST endpoint.',
    steps: [
      { n: '01', title: 'Apply for early access', desc: 'Jev is currently in early access — join the official waitlist at typesafe.ai.' },
      { n: '02', title: 'Define questions and options', desc: 'Break business judgments into Choice / Score / Noul questions, with options and scales described in clear natural language.' },
      { n: '03', title: 'Make the call', desc: 'Send the task state plus multiple questions in one request; typed results come back within 70–500ms.' },
      { n: '04', title: 'Consume results with if statements', desc: 'Results are structured values: branch on options, route by thresholds, and fall back to humans on low confidence.' },
    ],
    codeFile: 'quickstart.mjs · Node.js 18+',
    codeBadge: 'Documented API shape',
    code: quickstartExample,
    tipsTitle: 'Best practices',
    tips: [
      "Ask one specific, well-bounded judgment per question — like a domain expert's split-second intuition, not an analysis report.",
      'Split compound questions into atomic ones and combine them with weights in your own code — explainable and tunable.',
      'Use confidence thresholds for automated routing: above the threshold, act automatically; below it, fall back to a human.',
      '"Zero hallucination" means it cannot emit anything outside the type space — not that it cannot be wrong. Validate calibration on your own data before launch.',
    ],
  },
  cases: {
    eyebrow: 'In the Wild',
    title: 'Case studies: the community is already building',
    desc: 'Just days after launch, the community has already embedded Jev in all kinds of decision-heavy workflows. The cases below are publicly shared; figures are self-reported by their authors.',
    items: [
      {
        title: 'Vercel: command safety checks',
        stat: '5–18x',
        statLabel: 'faster and more accurate',
        desc: 'Vercel engineer Pranit Sharma replaced a ChatGPT-Luna-5.6-based command-safety classifier with Jev — 5–18x faster and more accurate.',
      },
      {
        title: 'Browser Use + Jev: browser agent books a flight',
        stat: '7s · $0.0039',
        statLabel: 'per booking decision',
        desc: 'Gregor Zunic demoed a browser agent using Jev for page decisions, completing a flight booking in 7 seconds at a cost of $0.0039.',
      },
      {
        title: 'Jev reviews PRs',
        stat: '$0.00007 / review',
        statLabel: '~200x cheaper than Claude',
        desc: 'Paolo Rosson has Jev make PR review decisions at about $0.00007 per review — roughly 200x cheaper than using Claude.',
      },
      {
        title: "Self-solving Rubik's cube",
        stat: '~250ms / move',
        statLabel: '94 moves to solved',
        desc: "Paolo Rosson's Rubik's cube demo: ~250ms per decision, solved in 94 moves — a perfect showcase for decision-dense tasks.",
      },
      {
        title: 'Large-scale adversarial test suite',
        stat: 'a few cents',
        statLabel: 'for the entire suite',
        desc: 'Rafal Wilinski ran a large-scale adversarial test suite with Jev for a total cost of a few cents — decisions cheap enough to "waste".',
      },
      {
        title: 'Spam triage',
        stat: '95.4%',
        statLabel: 'of mail fully automated',
        desc: 'With calibrated probabilities, both extremes are handled automatically and only the 0.3–0.7 band (4.6%) goes to human review — 99.5% overall accuracy.',
      },
    ],
  },
  videos: {
    eyebrow: 'Video Wall',
    title: 'Video wall: the whole internet is talking about Jev',
    desc: 'Hand-picked YouTube / Bilibili deep dives and tutorials, plus the hottest demo posts on X.',
    xHeading: 'X / Twitter highlights',
    footnote: '* View counts are snapshots from around 2026-09-19 and are growing fast — for reference only.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Can Jev write copy, write code, or chat?',
        a: 'No. Jev never generates text — it only makes decisions. The right setup pairs it with a generative model: Jev handles judgment (classification, routing, scoring, guardrails) while the LLM does the writing. Each does what it is best at.',
      },
      {
        q: 'Does "no hallucination" mean "never wrong"?',
        a: 'No. "Zero hallucination" means it is architecturally impossible for Jev to emit content outside the predefined type space (like inventing a nonexistent option) — but it can still pick the wrong answer. Fortunately it returns calibrated probabilities: validate confidence on your own data before launch, and use thresholds plus a human fallback.',
      },
      {
        q: 'How should I ask complex questions?',
        a: "Break them down. Each question should be one specific, well-bounded judgment — like a domain expert's split-second intuition. Split compound questions into atomic ones (a single call can ask many, with almost no latency change), then combine them with weights in your own code.",
      },
      {
        q: 'Is Jev open source? Can I self-host it?',
        a: 'No. Jev is only available as a hosted API — no weights, no self-hosting — and it is currently in an early-access waitlist phase. The community has also raised questions about its commercialization model, so do your own evaluation before committing.',
      },
      {
        q: "How is this different from an LLM's JSON Schema / function calling structured output?",
        a: 'An LLM\'s structured output is still "generate text token by token, then parse it into JSON" — slow, and parsing can still fail. Jev removes text generation at the architecture level and produces typed results in a single parallel forward pass: 70–500ms, zero type errors.',
      },
      {
        q: 'What does it cost?',
        a: "Official pricing: input at $0.042 / M tokens, output tokens free. It is in early access, so you'll need to join the waitlist first.",
      },
    ],
  },
  footer: {
    brandSuffix: 'System One Guide',
    disclaimerPre: 'This is an ',
    disclaimerStrong: 'unofficial community content site',
    disclaimerMid:
      ' with no affiliation to or sponsorship from TypeSafe AI. All trademarks and product names belong to their respective owners. Information compiled as of',
    disclaimerPost:
      '; view counts are snapshots from around 2026-09-19, for reference only — please defer to official sources.',
    sourcesTitle: 'Sources',
    bottom: 'Jev community guide · Unofficial · Made with curiosity',
  },
}
