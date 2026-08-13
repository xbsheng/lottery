# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

公开面向彩票爱好者：研究号码走势、查询历史开奖、查看统计数据的个人用户。用户带着具体任务而来（查某期开奖、看号码冷热、找遗漏），不是闲逛。

## Product Purpose

双色球 / 大乐透历史数据查询与统计站，免费、零后端、每日自动更新。用户能快速查到任意历史开奖、理解号码分布规律、辅助自己判断。

## Positioning

纯前端静态站：数据每日自动更新（GitHub Actions 多源拉取），打开即最新，无注册无广告；历史数据可回溯到 2003 年（双色球）与 2007 年（大乐透），比多数站点更全。

## Operating Context

桌面与移动浏览器均可访问，GitHub Pages 托管，子路径部署（`xbsheng.github.io/lottery/`）。数据通过 `raw.githubusercontent.com` 直接读取 data 分支 JSON，无后端 API。用户多为碎片时间快速查看，弱网环境可能访问 raw 域名。

## Capabilities and Constraints

- 双色球（6红+1蓝）、大乐透（5前区+2后区）历史开奖数据：3489 期 + 2909 期
- 功能由本次设计扩展（走势图、遗漏、随机选号、统计等），需保持数据驱动、纯前端可计算
- 技术栈：Vite 8（Rolldown）+ React + Tailwind v4 + oxlint，静态托管
- 数据文件为统一格式 `{issue, date, balls[], special[]}`，全部统计在浏览器端计算
- 中文界面，中国彩票语境（期号、开奖日等术语）
- 无法访问官方开奖 API，只能读已缓存 JSON（每日更新）

## Brand Commitments

无既有品牌资产。中文站名「彩票历史数据」（可用更贴切的站名提案）。

## Evidence on Hand

- `data/ssq.json` 3489 期（2003-01 至今）、`data/dlt.json` 2909 期（2007-05 至今），含期号/日期/号码
- 数据源：福彩官网、体彩官网（多源 fallback 至 GitHub 镜像 yangxb919/lottery-data）
- 无用户数据、无图片素材、无品牌文件

## Product Principles

1. 数据先行：所有视图由数据驱动，浏览器端即时计算，加载即最新
2. 快速可达：一个视口内完成最常见的任务（查最新开奖、看某期、看号码热度）
3. 可扩展：信息架构留出功能位（走势、遗漏、随机选号），后续加功能不推翻布局
4. 诚实：标注数据来源与更新机制，不编造统计结论
5. 移动友好：碎片时间场景，手机端体验与桌面同等重要

## Accessibility & Inclusion

无产品级特殊要求；保持基础可访问性（对比度、键盘可达、语义结构）。
