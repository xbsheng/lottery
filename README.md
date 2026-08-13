# 彩票历史数据

双色球 / 大乐透历史数据展示站，GitHub Pages 免费托管，数据每日自动更新。

## 架构

- **main 分支**：代码（Vite 8 内置 Rolldown + React + Tailwind v4 + oxlint）+ workflows
- **data 分支**：**仅含 `data/*.json`** 的孤儿分支，由 GitHub Actions 每日重建（force push），不污染 main 的提交历史
- **数据读取**：前端直接 fetch `raw.githubusercontent.com/<user>/<repo>/data/*.json`，数据更新立即生效，无需重新部署
- **发布**：`deploy` workflow 在 push main 时构建发布到 Pages

```
main ──push──▶ deploy workflow ──▶ GitHub Pages
data ──cron──▶ data workflow ──▶ 多源拉取 + 重建 data 分支(仅 JSON) ──▶ 前端直读 raw.githubusercontent.com
```

## 数据源（多源 fallback）

| 彩种 | 主源 | 备源 |
|---|---|---|
| 双色球 | 福彩官网接口（需 Referer） | yangxb919/lottery-data（GitHub 每日更新） |
| 大乐透 | 体彩官网接口 | yangxb919/lottery-data |

官方接口在 CI 环境下偶被 WAF 拦截（403/567），失败自动切换备源，数据不中断。

## 本地开发

```bash
pnpm install
python3 fetch.py --full --out public/data   # 拉全量数据到 public/data 供本地预览(被 gitignore, 不提交)
pnpm dev
```

## 部署到 GitHub（首次）

1. 新建仓库并推送（`<repo>` 换成实际仓库名）:
   ```bash
   git init -b main
   git add -A && git commit -m "init"
   git remote add origin https://github.com/xbsheng/<repo>.git
   git push -u origin main   # 触发 deploy workflow
   ```
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**
3. 手动触发一次 data workflow（Actions 页面）创建 data 分支，或等每日定时
4. 访问 `https://xbsheng.github.io/<repo>/`
