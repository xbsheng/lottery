import { useMemo } from 'react'
import type { Game, Row } from '../lib/games'
import { frequency, missStats, sumSeries } from '../lib/stats'
import Ball from './Ball'
import Icon from './Icon'

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: 'red' | 'blue' }) {
  return (
    <div className="flex items-center gap-2">
      <span className="num w-6 text-right text-xs text-ink-dim">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-hall">
        <div
          className={`h-full rounded-full ${color === 'red' ? 'bg-ball-red' : 'bg-ball-blue'}`}
          style={{ width: `${(value / max) * 100}%`, boxShadow: `0 0 8px ${color === 'red' ? '#ff4d3d66' : '#3d7bff66'}` }}
        />
      </div>
      <span className="num w-8 text-right text-xs text-ink">{value}</span>
    </div>
  )
}

function ListCard({
  title, rows, pick, color,
}: {
  title: string
  rows: Row[]
  pick: (r: Row) => string[]
  color: 'red' | 'blue'
}) {
  const freq = useMemo(() => frequency(rows, pick), [rows, pick])
  const top = freq.slice(0, 10)
  const bottom = freq.slice(-10).reverse()
  const hi = top[0]?.[1] ?? 1
  return (
    <div className="panel p-4 sm:p-5">
      <h4 className="mb-3 text-sm font-bold text-ink">{title}</h4>
      <div className="space-y-2">
        {top.map(([n, c]) => <Bar key={n} label={n} value={c} max={hi} color={color} />)}
      </div>
      <p className="mb-2 mt-5 text-xs text-ink-dim">冷门号码</p>
      <div className="space-y-2">
        {bottom.map(([n, c]) => <Bar key={n} label={n} value={c} max={hi} color={color} />)}
      </div>
    </div>
  )
}

function MissCard({ rows, pick, max, blue, game }: {
  rows: Row[]; pick: (r: Row) => string[]; max: number; blue?: boolean; game: Game
}) {
  const m = useMemo(() => missStats(rows, pick, max), [rows, pick, max])
  const top = [...m].sort((a, b) => b.current - a.current).slice(0, 8)
  return (
    <div className="panel p-4 sm:p-5">
      <h4 className="mb-3 text-sm font-bold text-ink">当前遗漏 Top</h4>
      <div className="space-y-1.5">
        {top.map((x) => (
          <div key={x.num} className="flex items-center gap-2">
            <Ball n={x.num} color={blue ? 'blue' : 'red'} size="xs" />
            <span className="num text-xs text-ink-dim">{x.current} 期未出</span>
            <span className="ml-auto num text-[10px] text-ink-dim">最大 {x.max} · 平均 {x.avg.toFixed(1)}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-ink-dim">{game.title} 全部 {max} 个号码的遗漏由浏览器即时计算，仅供参考</p>
    </div>
  )
}

function SumTrend({ rows }: { rows: Row[] }) {
  const data = useMemo(() => sumSeries(rows, 100), [rows])
  if (data.length === 0) {
    return (
      <div className="panel p-4 sm:p-5">
        <h4 className="mb-1 text-sm font-bold text-ink">和值趋势</h4>
        <p className="text-xs text-ink-dim">等待数据…</p>
      </div>
    )
  }
  const W = 560, H = 140, P = 8
  const max = Math.max(...data.map((d) => d.sum))
  const min = Math.min(...data.map((d) => d.sum))
  const x = (i: number) => P + (i / (data.length - 1)) * (W - P * 2)
  const y = (v: number) => H - P - ((v - min) / (max - min || 1)) * (H - P * 2)
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.sum).toFixed(1)}`).join(' ')
  return (
    <div className="panel p-4 sm:p-5">
      <h4 className="mb-1 text-sm font-bold text-ink">和值趋势</h4>
      <p className="mb-3 text-xs text-ink-dim">最近 {data.length} 期红球和值</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="和值趋势折线图">
        <line x1={P} y1={H / 2} x2={W - P} y2={H / 2} stroke="rgba(233,239,248,0.08)" strokeDasharray="3 4" />
        <path d={path} fill="none" stroke="#ffc84d" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" opacity="0.95" />
        <circle
          cx={x(data.length - 1)} cy={y(data[data.length - 1].sum)} r="3"
          fill="#ffc84d" style={{ boxShadow: '0 0 10px #ffc84d' }}
        />
        <text x={x(0)} y={H - 2} className="fill-ink-dim" fontSize="9">{data[0].issue.slice(-4)}</text>
        <text x={W - P - 30} y={H - 2} className="fill-ink-dim" fontSize="9">{data[data.length - 1].issue.slice(-4)}</text>
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-ink-dim">
        <span>低 <span className="num text-ink">{min}</span></span>
        <span>高 <span className="num text-ink">{max}</span> · 最新 <span className="num text-gold">{data[data.length - 1].sum}</span></span>
      </div>
    </div>
  )
}

export default function Stats({ game, rows }: { game: Game; rows: Row[] }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-ink-dim">
        <Icon name="spark" className="size-4 text-gold" />
        全部历史即时统计（{rows.length} 期）
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ListCard title="高频号码 Top 10" rows={rows} pick={(r) => r.balls} color="red" />
        <ListCard title="高频特殊号 Top 10" rows={rows} pick={(r) => r.special} color="blue" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <MissCard rows={rows} pick={(r) => r.balls} max={game.ballsMax} game={game} />
        <MissCard rows={rows} pick={(r) => r.special} max={game.specialMax} blue game={game} />
        <SumTrend rows={rows} />
      </div>
    </section>
  )
}
