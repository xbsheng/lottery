---
name: 开奖大厅
description: 深色演播大厅里的彩票数据仪式——发光球体、等宽数字、舞台光晕
colors:
  hall: "#080d1a"
  panel: "#0f1830"
  panel-2: "#0c1428"
  edge: "#1e2b4a"
  edge-2: "#2a3a61"
  ink: "#e9eff8"
  ink-dim: "#93a3c0"
  ball-red: "#ff4d3d"
  ball-blue: "#3d7bff"
  gold: "#ffc84d"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "12px"
    fontFeature: "'tnum' 1"
rounded:
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "#1a1400"
    rounded: "{rounded.md}"
    padding: "14px 8px"
  button-tab:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  input-search:
    backgroundColor: "{colors.hall}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "6px 32px"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: 开奖大厅

## Overview

**Creative North Star: "The Draw Hall"（开奖大厅）**

开奖是一场仪式。深色演播大厅（深海军蓝黑底 #080d1a）里，最新一期号码作为发光球体依次点亮登场，金黄期号如舞台字幕，全部历史数据（2003 年至今 6400 期）在浏览器端即时统计。视觉上拒绝中彩网式的浅色表格门户：不追求信息密度极限的表格感，而是让每一次查询都发生在灯光下的舞台上。数据是本体的材料——等宽数字、发丝网格、面板的柔和阴影构成演播室的景深，红蓝双球是仅有的饱和色，金黄只留给期号、高亮与主操作。

**Key Characteristics:**
- 深色演播室基调，红/蓝双球是仅有的高饱和色，金黄为高亮色
- 数字一律等宽（tabular），统计与期号是界面主角
- 面板为深色玻璃 + 1px 发丝边框 + 柔和投影，发光球体自带内高光外光晕
- 动效集中于一个仪式时刻：球体依次点亮（staggered blur→bright）
- 无渐变文字、无 emoji 图标（全部手绘 SVG 图标）、无衬线中文系统字体

## Colors

深色舞台底 + 双球体饱和色 + 金黄高亮。所有次级文字从蓝灰调变化（ink-dim），不用纯灰。

### Primary
- **Ball Red** (#ff4d3d): 双色球红球 / 大乐透前区、高频条形、走势点亮格。本体色，占视觉主角。
- **Ball Blue** (#3d7bff): 双色球蓝球 / 大乐透后区、走势蓝格。与红球构成仅有的饱和对。

### Secondary
- **Stage Gold** (#ffc84d): 期号数字、最新和值、主操作按钮、折线。高亮色，使用克制。

### Neutral
- **Hall** (#080d1a): 页面底色，演播室黑暗。
- **Panel** (#0f1830) / **Panel-2** (#0c1428): 面板渐变两端，深色玻璃。
- **Edge** (#1e2b4a) / **Edge-2** (#2a3a61): 1px 发丝边框、选中态底。
- **Ink** (#e9eff8): 主文字。
- **Ink Dim** (#93a3c0): 次级文字，蓝灰调而非纯灰，在深底上保持 ≥4.5:1。

### Named Rules
**The Stage-Light Rule.** 红蓝只属于球体与数据点亮，金黄只属于高亮与主操作；背景永远是黑暗的，光打在数据上。

## Typography

**Display/Headline:** 系统无衬线（-apple-system / PingFang SC），标题用粗体（700-800）+ 紧 tracking；不引外部字体，演播室字幕就是无衬线。
**Body:** 同栈，14px，行高 1.6，正文 measure 控制在 ~70ch。
**Label/Mono:** ui-monospace 栈（SF Mono / Menlo），全部数字启用 `tnum` 等宽——期号、统计、倒计时、遗漏数都是"测量值"，等宽是测量的语言。

### Hierarchy
- **Display**（800, 20-24px, 1.2）: 最新开奖期号、站名。大屏的标题级。
- **Headline**（700, 16px, 1.3）: 面板标题（遗漏走势、号码统计、历史开奖、随机选号）。
- **Title**（600-700, 14px, 1.4）: 按钮文字、tab 文字。
- **Body**（400, 14px, 1.6）: 说明与正文，≤70ch。
- **Label**（400, 10-12px, mono, `tnum`）: 期号、统计数字、表格数据、倒计时。

### Named Rules
**The Measurement Rule.** 任何数字——期号、频率、遗漏、倒计时、和值——必须用等宽字体渲染，保证同一数字在任何位置视觉宽度一致。这是数据站的诚实性。

## Layout

单列容器 `max-w-6xl`（72rem），内容区 `px-4 sm:px-6`，节距 `space-y-6`（24px）。页面结构固定为：品牌行（发光 logo + 站名 + 彩种切换）→ 粘性导航（锚点：遗漏走势/号码统计/历史开奖/随机选号）→ 最新开奖大屏 → 走势 → 统计 → 历史 → 随机选号 → 页脚。面板内边距 `p-4 sm:p-5`，面板间标题上空间大于下空间。响应式：大屏球体 xl 尺寸在移动端保留、表格容器 `overflow-x-auto` + `min-w` 防溢出、导航横向滚动。历史表格固定 `max-h-[28rem]` 内部滚动。

## Elevation & Depth

混合体系：面板用柔和投影 + 内顶高光表达"玻璃板"（`box-shadow: 0 12px 32px -12px rgba(0,0,0,.55), inset 0 1px 0 rgba(233,239,248,.04)`），球体用多层光晕表达"发光体"（外发光 + 内高光 + 内阴影形成立体球）。页面顶部有环境光晕（hall-glow 径向渐变），模拟演播室顶灯。深度是演播室的三维空间，不是卡片的平面堆叠。

### Shadow Vocabulary
- **Panel** (`0 12px 32px -12px rgba(0,0,0,.55)`): 所有面板。
- **Ball Red / Blue / Gold**（多层 `box-shadow`）: 发光球体，唯一允许强光晕的元素。

## Shapes

圆角语言：面板与卡片 12px（rounded-xl），按钮/输入/标签 8px（rounded-md），球体全圆。边框一律 1px 发丝（edge 色），无 >1px 侧边框。图标为统一 1.5px 描边的内联 SVG（24 viewBox），线条末端圆角。

## Components

### Buttons
- **Shape:** 圆角 8px（rounded-md），1px 边框。
- **Primary**（随机一注）: 金黄底 + 深棕字（#1a1400），hover 提亮 110%，active 缩小 95%。它是全场唯一的高饱和操作。
- **Tab**（彩种切换）: 面板底 + 发丝边框容器内；选中态 `bg-edge-2 text-ink`，未选中 `text-ink-dim hover:text-ink`。
- **Ghost**（页码/排序/期数切换）: 发丝边框 + 透明底，hover 亮边框与文字，disabled 40% 透明度。

### Inputs
- **搜索框**: hall 底 + 发丝边框 + 放大镜 SVG 图标前置（absolute 定位），placeholder 用 ink-dim（不降透明度），focus 边框换 edge-2。

### Panels / Cards
- **Corner Style:** 12px（rounded-xl）。
- **Background:** panel 渐变（180deg panel→panel-2）。
- **Shadow Strategy:** Panel 阴影（见 Elevation）。
- **Border:** 1px edge。
- **Internal Padding:** p-4 sm:p-5（16→20px）。

### Balls（Signature Component）
发光球体是本世界的签名元素：径向渐变（光源偏左上 32%/28%）+ 三层 box-shadow（外光晕 + 内顶高光 + 内底阴影）+ 等宽白字。尺寸档 xs(20px)/sm(28px)/md(36px)/lg(48px)/xl(64px)。红球红渐变、蓝球蓝渐变、金黄用于统计强调。开奖仪式入场时叠加 `ball-lit` 动画（blur→bright 依次点亮）。

### Navigation
粘性顶栏（hall 底 85% + backdrop-blur），品牌行 + 彩种切换胶囊；下方锚点导航横向滚动，图标 + 文字 12px。滚动时页面内容从半透明顶栏透出。

### 遗漏走势网格
号码 × 期数的热力网格：出现点亮（红/蓝小方块 + 同色微光晕）、未出现 5% 白。行头号码、列头期号后两位、行尾当前遗漏数（金色高亮 ≥ 全窗口）。hover 单元格放大 1.25。

## Do's and Don'ts

### Do:
- **Do** 用等宽渲染一切数字（Measurement Rule）。
- **Do** 让光只打在数据上：红蓝球、金黄高亮，其余保持暗底（Stage-Light Rule）。
- **Do** 用 1px 发丝边框分隔面板内部（表格行、面板边框）。
- **Do** 让次级文字从蓝灰调变化，不引入纯灰。
- **Do** 切彩种时重新触发球体点亮动画（仪式感）。

### Don't:
- **Don't** 引入浅色表格门户式的白色卡片与黑色文字（世界的反面）。
- **Don't** 用渐变文字、emoji 图标、或系统展示字体做标题（craft-floor 禁令）。
- **Don't** 用零偏移纯色光晕冒充阴影（深度必须带 offset + blur）。
- **Don't** 在面板上叠面板（嵌套卡片）：面板是终层容器。
- **Don't** 编造统计数据或开奖结论：所有数字必须来自数据文件。
