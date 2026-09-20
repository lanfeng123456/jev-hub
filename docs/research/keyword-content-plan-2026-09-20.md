# Jev Hub：Similarweb 关键词与内容页

查询日期：2026-09-20。使用用户指定的 `sim.seogroup.club` Similarweb 界面。

## 数据口径与限制

- 地域：全球；搜索引擎：Google；所有流量；界面显示“最后 28 天数 (As of Sep 16)”。
- 检查了 `jev`、`jev ai`、`typesafe` 的语句匹配，以及 `typesafe` 的相关关键词和问题查询。检查每组第一屏/第一页最多 100 条，不声称穷尽全部关键词。
- 原始筛选记录保存于 `similarweb-2026-09-20.json`，保留查询 URL、28 天体量、平均体量、KD 和领先域名。
- 这些是工具估算，不是本站流量，也不是 Google Search Console 数据。近期发布词的 28 天体量与长期平均体量差异较大，不能把它们包装成稳定月搜索量。
- KD 为 `-` 表示缺失，不能解释成低竞争。没有进行独立的完整前十 SERP 审计，不给这些词编造难度分数。
- 工具在 typesafe 语句匹配中出现相同显示词不同数值的记录，原始文件保留；不相加，采用主要记录用于选题。
- 排除 FaZe Jev、Jevil、疫苗、Sarajevo、Typesafe Config 等同名或字符串匹配噪声。

## 选题依据

| 关键词 | 近28天估算 | KD | 页面处理 |
| --- | ---: | --- | --- |
| typesafe ai | 72.5K | 6 | 现有首页承接品牌介绍 |
| jev ai | 52.2K | 未提供 | 现有首页，避免再做重复品牌介绍页 |
| jev model | 6.4K | 未提供 | 首页及指南目录 |
| typesafe jev | 5.1K | 未提供 | 首页 |
| jev typesafe | 2.5K | 未提供 | 首页 |
| typesafe ai docs | 680 | 未提供 | API 入门；清楚标明社区指南并链接官方文档 |
| jev api | 650 | 未提供 | API 入门 |
| jev ai download | 610 | 未提供 | 下载与访问申请，直接解释 API/SDK/权重的区别 |
| typesafe ai jev benchmarks | 540 | 未提供 | 评测解释与局限 |
| jev waitlist | 370 | 未提供 | 下载与访问申请 |
| jev ai waitlist | 260 | 未提供 | 下载与访问申请，同意图合并 |
| system one jev | 240 | 未提供 | 首页及评测页的适用场景 |
| typesafe ai price | 110 | 未提供 | 费用指南，低量但意图明确 |
| typesafe.ai context size | 80 | 未提供 | 费用页链接官方模型限制，避免过时硬编码 |
| how to use typesafe ai | 70 | 未提供 | API 入门 |

优先级：API 入门 → 下载/访问申请 → 评测解释 → 价格。合并近义查询，避免为每个关键词制造薄页。未据缺失 KD 宣称低竞争，也未将品牌流量预测为本站可获得流量。

## 页面与实现

四篇原创主题文章，每篇中英文各一份，共八篇内容页；另有中英文指南目录，共十个新 URL。

| 主题 | 英文 | 中文 |
| --- | --- | --- |
| 指南目录 | /guides/ | /zh/guides/ |
| API | /guides/jev-api/ | /zh/guides/jev-api/ |
| 下载与访问 | /guides/jev-access/ | /zh/guides/jev-access/ |
| 价格 | /guides/jev-pricing/ | /zh/guides/jev-pricing/ |
| 评测 | /guides/jev-benchmarks/ | /zh/guides/jev-benchmarks/ |

沿用深色、绿色强调、等宽标签的现有视觉。静态 HTML 在 dev/build 前生成并由 Vite 复制到产物；全文和元信息不依赖浏览器 JavaScript。正文包括结论、步骤、表格、FAQ、来源及关联文章。

每页独立 canonical、互相对应的 en/zh-CN/x-default、Article/CollectionPage 和 BreadcrumbList。首页增加指南入口与四篇卡片，保留 GA4；站点地图生成 11 个 URL。FAQ 是面向读者的内容，不承诺搜索增强结果。

内容源：`content/guides.json`。共享 API 示例：`content/examples/quickstart.txt`。生成器：`scripts/generate-guides.mjs`。生成 HTML 不直接修改，评审源文件。

## 事实核对

核对了 TypeSafe 官方发布文章、首页、Quick start、API reference、Models、Confidence，以及 Choice / Score / Noul 文档。每篇正文底部列出对应来源。

重要修正：首页原有示意接口 `/v1/decide` 改为文档中的 `/v1/systemone`；questions 是对象；使用 instructions 和 criteria；Noul 读 noul；Score 等级从 0 开始。共享示例使用服务端密钥，只有日志输出，不执行业务动作。没有调用收费推理 API。

费用示例为按公开单价计算的假设账单，不是实测消费。193.6×、444.6× 明确标注官方工作流结果，没有冒充本站复现。未声称可下载模型权重，未承诺候补审批时间。核对日期固定为真实编辑日期，不在每次构建时伪造新鲜度。
