import { useEffect, useState } from 'react'
import type { Row } from './lib/games'
import { GAMES } from './lib/games'
import LatestDraw from './components/LatestDraw'
import TrendChart from './components/TrendChart'
import Stats from './components/Stats'
import HistoryTable from './components/HistoryTable'
import RandomPicker from './components/RandomPicker'
import Skeleton from './components/Skeleton'
import Icon from './components/Icon'

// 数据存于仓库 data 分支的 data/ 目录, 通过 raw.githubusercontent.com 直读(参照 xbsheng 项目 output 分支模式)
// 部署到 Pages 时从 URL 推断 user/repo, 本地 dev 直接读根目录 data/
function dataUrl(key: string) {
  const { hostname, pathname } = location
  if (hostname.endsWith('github.io')) {
    const repo = pathname.split('/')[1]
    return `https://raw.githubusercontent.com/${hostname.split('.')[0]}/${repo}/data/data/${key}.json`
  }
  return `data/${key}.json`
}

const NAV = [
  { id: 'trend', label: '遗漏走势', icon: 'spark' },
  { id: 'stats', label: '号码统计', icon: 'chart' },
  { id: 'history', label: '历史开奖', icon: 'table' },
  { id: 'random', label: '随机选号', icon: 'dice' },
] as const

export default function App() {
  const [data, setData] = useState<Record<string, Row[]>>({})
  const [error, setError] = useState('')
  const [gameKey, setGameKey] = useState<'ssq' | 'dlt'>('ssq')
  const game = GAMES[gameKey]
  const rows = data[gameKey] ?? []

  useEffect(() => {
    Promise.all(
      (Object.keys(GAMES) as ('ssq' | 'dlt')[]).map(
        async (k) => [k, await (await fetch(dataUrl(k))).json()] as const,
      ),
    )
      .then((p) => setData(Object.fromEntries(p)))
      .catch((e) => setError(String(e)))
  }, [])

  return (
    <div className="min-h-screen">
      <header className="hall-glow sticky top-0 z-40 border-b border-edge bg-hall/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex">
              <span className="ball-red size-6 rounded-full" />
              <span className="ball-blue -ml-2 size-6 rounded-full" />
            </span>
            <span className="text-lg font-bold tracking-tight text-ink">开奖大厅</span>
            <span className="hidden text-xs text-ink-dim md:inline">双色球 · 大乐透 历史数据</span>
          </a>
          <div className="flex items-center gap-1 rounded-xl border border-edge bg-panel p-1">
            {(Object.keys(GAMES) as ('ssq' | 'dlt')[]).map((k) => (
              <button
                key={k}
                onClick={() => setGameKey(k)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                  gameKey === k ? 'bg-edge-2 text-ink' : 'text-ink-dim hover:text-ink'
                }`}
              >
                {GAMES[k].title}
              </button>
            ))}
          </div>
        </div>
        <nav className="mx-auto max-w-6xl px-4 pb-2 sm:px-6">
          <div className="flex gap-1 overflow-x-auto">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs text-ink-dim transition hover:bg-panel hover:text-ink"
              >
                <Icon name={n.icon} className="size-3.5" />
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            数据加载失败: {error}（data 分支数据可能尚未就绪，首次自动抓取后恢复）
          </p>
        )}
        {Object.keys(data).length === 0 && !error ? <Skeleton /> : (
          <>
            <LatestDraw game={game} latest={rows.at(-1)} earliest={rows[0]} />

        <div id="trend" className="scroll-mt-28">
          <TrendChart game={game} rows={rows} />
        </div>
        <div id="stats" className="scroll-mt-28">
          <Stats game={game} rows={rows} />
        </div>
        <div id="history" className="scroll-mt-28">
          <HistoryTable rows={rows} />
        </div>
        <div id="random" className="scroll-mt-28">
          <RandomPicker game={game} />
        </div>
          </>
        )}
      </main>

      <footer className="border-t border-edge bg-panel-2/50">
        <div className="mx-auto max-w-6xl space-y-1.5 px-4 py-8 text-xs text-ink-dim sm:px-6">
          <p>数据来源：中国福利彩票 / 中国体育彩票官网，多源自动抓取，每日更新。</p>
          <p>本站全部统计在浏览器端即时计算，仅供学习参考；开奖结果以官方公告为准，请理性购彩。</p>
          <p className="num pt-1">GitHub Pages 托管 · 数据分支每日自动更新 · 开源</p>
        </div>
      </footer>
    </div>
  )
}
