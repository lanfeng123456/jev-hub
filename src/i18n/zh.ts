import quickstartExample from '../../content/examples/quickstart.txt?raw'
// Chinese (default) dictionary. The shape of this object is the contract:
// `en.ts` (and any future language such as `ja.ts`) must satisfy `Messages`.
export const zh = {
  meta: {
    title: 'Jev 决策模型中文站',
    htmlLang: 'zh-CN',
  },
  nav: {
    brandSuffix: '决策模型中文站',
    links: [
      { href: '#overview', label: '概览' },
      { href: '#primitives', label: '三大原语' },
      { href: '#advantages', label: '优势' },
      { href: '#quickstart', label: '快速上手' },
      { href: '#cases', label: '实战案例' },
      { href: '#videos', label: '视频' },
      { href: '#faq', label: 'FAQ' },
    ],
    cta: '早期访问',
  },
  hero: {
    badge: '2026-09-15 · TypeSafe AI 结束隐身发布',
    tagline: '不写一个字的大模型',
    leadA: 'TypeSafe AI 首个 ',
    leadStrong: 'System One 决策模型',
    leadB: '—— 不生成文本，只返回带校准概率的类型化决策。把「智能 if 语句」嵌进你的工作流。',
    ctaVideos: '看视频',
    ctaQuick: '快速上手',
    stats: [
      '延迟上限（70–500ms）',
      '输出 token 费用（免费）',
      '类型错误（构造上不可能）',
      '种子轮融资（DCVC 领投）',
    ],
  },
  overview: {
    eyebrow: 'What is Jev',
    title: '什么是 Jev？',
    desc: 'Jev 是 TypeSafe AI 推出的第一个「System One 模型」。它从不生成文本：你给它任务/工作流的当前状态，加上一组结构化问题，它返回带校准概率的类型化决策——本质上是工作流里的「智能 if 语句」。',
    cards: [
      {
        title: 'System One，不是 System Two',
        desc: '借用卡尼曼的比喻：System Two 是慢思考、推理、写长文；System One 是几秒内凭直觉下判断。聊天大模型擅长前者，Jev 专攻后者——分类、路由、评分、抽取、策略检查。',
      },
      {
        title: 'LLM 是作文状元，Jev 是判断题高手',
        desc: '让作文状元做判断题，它也得先写一段话再被解析。Jev 在架构层面取消了文本生成，一次并行前向传播直接给出答案与概率——快、便宜、永不越界。',
      },
      {
        title: 'RLHF 共同发明者出品',
        desc: '创始人 Diogo Almeida 是前 OpenAI 研究员、RLHF（ChatGPT 背后的研究）共同发明者；联合创始人为 Erik Gafni 与 Sasha Sheng。公司在隐身模式下打磨了两年。',
      },
    ],
    bannerPre: ' —— TypeSafe AI 宣布结束隐身，发布 Jev，并披露由 DCVC 领投的 ',
    bannerPost: ' 种子轮融资。',
  },
  primitives: {
    eyebrow: 'Three Primitives',
    title: '三大原语：Choice · Score · Noul',
    desc: 'Jev 的全部能力由三个原语组合而成。一次调用可以问多个问题，且增加问题几乎不改变响应时间。',
    items: [
      {
        cn: '选择',
        desc: '从最多 255 个选项中挑一个。返回所选选项、每个选项的概率和置信度；可选显式的 other 兜底项。候选超过 255 时用两阶段模式：先打分、再选择。',
        example: '「这封工单该分给哪个团队？」→ billing: 0.81 · tech: 0.12 · other: 0.07',
      },
      {
        cn: '评分',
        desc: '把状态放到一个 2–10 级、用文字描述的有序刻度上。返回的分数可以落在级别之间（如 1.4），并附带每级概率与置信度。',
        example: '「客户有多生气？1=平静 … 5=暴怒」→ 3.6（P(4)=0.55, P(3)=0.31）',
      },
      {
        cn: '是否',
        desc: '一个是/否断言，返回 0–1 的校准概率。名字是 no 与 null 的合成词——专为布尔判断而生。',
        example: '「客户是否明确要求退款？」→ 0.93（是）',
      },
    ],
    comboStrong: '一次调用，多个问题。',
    comboText:
      '例如处理一封客服工单时，可以在同一个请求里同时问：该分给哪个团队（Choice）、客户有多生气（Score）、是否明确要求退款（Noul）——延迟几乎不变。',
  },
  advantages: {
    eyebrow: 'Why Jev',
    title: 'Jev vs 传统 LLM：为决策而生',
    desc: 'LLM 的结构化输出是「先逐 token 生成文本、再解析」；Jev 在架构层面取消文本生成，一次并行前向传播直接产出类型化结果。',
    cards: [
      {
        title: '极速',
        desc: '官方标称 70–500ms 延迟，比 LLM 快约两个数量级；社区在决策负载上测得最高约 200x 加速。',
      },
      {
        title: '极省',
        desc: '输入 $0.042/M tokens、输出 token 免费；第三方在决策负载上报告最高约 400x 成本下降。',
      },
      {
        title: '类型安全 · 零幻觉',
        desc: '输出永远在预定义类型空间内，构造上不可能编造越界内容——但仍可能选错答案，置信度需在你自己的数据上验证。',
      },
      {
        title: '校准置信度',
        desc: 'RLCD 训练让所述概率对齐真实准确率：它说 70%，这类预测就约 70% 正确。可以放心用阈值做自动化路由。',
      },
    ],
    table: {
      dimHead: '维度',
      jevHead: 'Jev',
      llmHead: '传统 LLM',
      rows: [
        ['优化方式', 'RLCD（校准决策强化学习）', 'RLHF / RLVR'],
        ['输出', '类型安全的结构化值，永不越界', '字符串，需 JSON Schema / function calling 解析'],
        ['延迟', '70–500ms', '数秒'],
        ['成本', '输入 $0.042/M tokens，输出免费', '按输出 token 计费'],
        ['类型错误', '0（构造上不可能）', '低但非零'],
        ['置信度', '校准概率：说 70% 就约 70% 对', '常过度自信'],
        ['适用场景', '自动化决策：分类 / 路由 / 评分 / 抽取 / 策略检查', '开放式生成：写作 / 对话 / 代码'],
      ] as [string, string, string][],
    },
    spam: {
      title: '数字说话：垃圾邮件分流示例',
      box1a: 'score < 0.1 → 0.1% 是垃圾',
      box1b: 'score > 0.9 → 99.9% 是垃圾',
      box1note: '两端直接自动处理',
      box2a: '0.5–0.6 → 38% 是垃圾',
      box2note: '只把 0.3–0.7 区间（占 4.6% 邮件）送人工复核',
      box3label: '整体准确率',
      footnote: '校准概率让「两端自动化、中间送人工」成为可量化的工程决策，而不是拍脑袋。',
    },
  },
  quickstart: {
    eyebrow: 'Quick Start',
    title: '快速上手：四步接入',
    desc: 'Jev 不开源、仅提供托管 API。接入方式和调一个 REST 接口一样简单。',
    steps: [
      { n: '01', title: '申请早期访问', desc: 'Jev 目前处于早期访问阶段，需加入官方 waitlist（typesafe.ai）。' },
      { n: '02', title: '定义问题与选项', desc: '把业务判断拆成 Choice / Score / Noul 问题，选项和刻度用清晰的自然语言描述。' },
      { n: '03', title: '发起调用', desc: '一次请求传入任务状态 + 多个问题，70–500ms 内返回类型化结果。' },
      { n: '04', title: '用 if 语句消费结果', desc: '结果就是结构化值：按选项分支、按阈值路由，低置信度回落人工。' },
    ],
    codeFile: 'quickstart.mjs · Node.js 18+',
    codeBadge: '官方接口结构',
    code: quickstartExample,
    tipsTitle: '最佳实践',
    tips: [
      '每个问题只问一个具体、边界清晰的判断——像领域专家几秒钟的直觉，而不是一篇分析报告。',
      '复合问题拆成多个原子问题，在你自己的代码里加权组合，可解释、可调参。',
      '用置信度阈值做自动化路由：高于阈值自动执行，低于阈值回落人工。',
      '「零幻觉」指不可能输出类型空间之外的内容，不代表不会选错——上线前务必在你的数据上验证校准度。',
    ],
  },
  cases: {
    eyebrow: 'In the Wild',
    title: '实战案例：社区已经玩起来了',
    desc: '发布仅数日，社区已经把 Jev 塞进了各种决策密集型工作流。以下为公开分享的案例，数据为作者自报。',
    items: [
      {
        title: 'Vercel：命令安全检查',
        stat: '5–18x',
        statLabel: '更快且更准确',
        desc: 'Vercel 工程师 Pranit Sharma 用 Jev 替换了基于 ChatGPT-Luna-5.6 的命令安全检查分类器，结果快 5–18 倍且更准确。',
      },
      {
        title: 'Browser Use + Jev：浏览器 Agent 订机票',
        stat: '7 秒 · $0.0039',
        statLabel: '完成一次订票决策',
        desc: 'Gregor Zunic 演示浏览器 Agent 用 Jev 做页面决策，7 秒、成本 $0.0039 完成订机票流程。',
      },
      {
        title: 'Jev 审查 PR',
        stat: '$0.00007 / 次',
        statLabel: '约比 Claude 便宜 200 倍',
        desc: 'Paolo Rosson 让 Jev 做 PR 审查决策，每次成本约 $0.00007，比用 Claude 便宜约 200 倍。',
      },
      {
        title: '魔方自解',
        stat: '~250ms / 步',
        statLabel: '94 步还原',
        desc: 'Paolo Rosson 的魔方求解 demo：每步决策约 250ms，共 94 步完成还原——决策密集型任务的绝佳秀场。',
      },
      {
        title: '大规模对抗测试套件',
        stat: '几美分',
        statLabel: '跑完整个测试套件',
        desc: 'Rafal Wilinski 用 Jev 跑大规模对抗测试套件，总成本只有几美分——决策便宜到可以「挥霍」。',
      },
      {
        title: '垃圾邮件分流',
        stat: '95.4%',
        statLabel: '邮件全自动处理',
        desc: '利用校准概率，两端自动处理、仅 0.3–0.7 区间（4.6%）送人工，整体准确率 99.5%。',
      },
    ],
  },
  videos: {
    eyebrow: 'Video Wall',
    title: '视频墙：全网都在聊 Jev',
    desc: '精选 YouTube / Bilibili 深度解读与教程，以及 X 上的高热度演示帖。',
    xHeading: 'X / Twitter 高热帖',
    footnote: '* 播放数据为 2026-09-19 前后快照，增长极快，仅供参考。',
  },
  faq: {
    eyebrow: 'FAQ',
    title: '常见问题',
    items: [
      {
        q: 'Jev 能写文案、写代码、聊天吗？',
        a: '不能。Jev 从不生成文本，它只做决策。正确姿势是搭配一个生成式模型：Jev 负责判断（分类、路由、评分、把关），LLM 负责写作。各干各最擅长的事。',
      },
      {
        q: '「不会幻觉」是不是等于「不会错」？',
        a: '不是。「零幻觉」指它在构造上不可能输出预定义类型空间之外的内容（比如编一个不存在的选项），但它仍然可能选错答案。好在它会给出校准概率——上线前请在你自己的数据上验证置信度，并用阈值+人工兜底。',
      },
      {
        q: '复杂问题该怎么问？',
        a: '拆。每个问题应该是一个具体、边界清晰的判断，像领域专家几秒钟的直觉。把复合问题拆成多个原子问题（一次调用可以问多个，延迟几乎不变），然后在你自己的代码里加权组合。',
      },
      {
        q: 'Jev 开源吗？能自部署吗？',
        a: '不开源。Jev 仅以托管 API 形式提供，没有权重、不能自托管，目前处于早期访问 waitlist 阶段。社区也就其商业化模式提出过一些疑问，入手前建议自行评估。',
      },
      {
        q: '和 LLM 的 JSON Schema / function calling 结构化输出有什么区别？',
        a: 'LLM 的结构化输出仍然是「先逐 token 生成文本、再解析成 JSON」，慢且仍可能解析失败。Jev 在架构层面取消了文本生成，用一次并行前向传播直接产出类型化结果——70–500ms、零类型错误。',
      },
      {
        q: '怎么收费？',
        a: '官方定价：输入 $0.042 / M tokens，输出 tokens 免费。目前处于早期访问阶段，需先加入 waitlist。',
      },
    ],
  },
  footer: {
    brandSuffix: '决策模型中文站',
    disclaimerPre: '本站为',
    disclaimerStrong: '非官方社区内容站',
    disclaimerMid:
      '，与 TypeSafe AI 无任何隶属或赞助关系。所有商标、产品名称归其各自所有者。资料整理截至',
    disclaimerPost: '，播放量为 2026-09-19 前后快照，仅供参考；请以官方信息为准。',
    sourcesTitle: '资料来源',
    bottom: 'Jev 中文社区内容站 · 非官方 · Made with curiosity',
  },
}

export type Messages = typeof zh
