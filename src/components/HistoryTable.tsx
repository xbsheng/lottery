import { useMemo, useState } from 'react'
import type { Row } from '../lib/games'
import { weekdayOf } from '../lib/games'
import Ball from './Ball'
import Icon from './Icon'

const PAGE_SIZE = 50

export default function HistoryTable({ rows }: { rows: Row[] }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [rev, setRev] = useState(false) // 正序/倒序

  const filtered = useMemo(() => {
    const q = query.trim()
    const list = q ? rows.filter((r) => r.issue.includes(q) || r.date.includes(q)) : rows
    return rev ? [...list].reverse() : [...list].reverse().slice(0) // 默认最新在前
  }, [rows, query, rev])

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const cur = Math.min(page, pages)
  const view = filtered.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE)

  return (
    <section className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge p-4 sm:p-5">
        <h3 className="text-base font-bold text-ink">历史开奖</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="search" className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-dim" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="搜期号或日期，如 2026 / 08-11"
              className="w-48 rounded-lg border border-edge bg-hall px-8 py-1.5 text-sm text-ink placeholder:text-ink-dim focus:border-edge-2 focus:outline-none sm:w-60"
            />
          </div>
          <button
            onClick={() => { setRev(!rev); setPage(1) }}
            className="flex items-center gap-1.5 rounded-lg border border-edge bg-hall px-2.5 py-1.5 text-sm text-ink-dim transition hover:border-edge-2 hover:text-ink"
            title="切换排序"
          >
            <Icon name="refresh" className="size-3.5" />
            <span className="num">{rev ? '旧→新' : '新→旧'}</span>
          </button>
        </div>
      </div>

      <div className="max-h-[28rem] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-panel-2 text-left text-xs text-ink-dim">
            <tr>
              <th className="px-4 py-2.5 font-normal sm:px-5">期号</th>
              <th className="px-2 py-2.5 font-normal">日期</th>
              <th className="px-2 py-2.5 font-normal">号码</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge/60">
            {view.map((r) => (
              <tr key={r.issue} className="transition-colors hover:bg-panel/70">
                <td className="px-4 py-2 sm:px-5">
                  <span className="num text-ink">{r.issue}</span>
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-ink-dim">
                  {r.date} <span className="text-xs">{weekdayOf(r.date)}</span>
                </td>
                <td className="px-2 py-2">
                  <span className="flex flex-wrap items-center gap-1">
                    {r.balls.map((n, i) => <Ball key={i} n={n} size="xs" />)}
                    {r.special.map((n, i) => <Ball key={`s${i}`} n={n} color="blue" size="xs" />)}
                  </span>
                </td>
              </tr>
            ))}
            {view.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-10 text-center text-sm text-ink-dim">没有匹配的开奖记录</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-edge px-4 py-3 text-sm text-ink-dim sm:px-5">
        <span className="num">{total} 期</span>
        <div className="flex items-center gap-1.5">
          <button
            disabled={cur <= 1}
            onClick={() => setPage(cur - 1)}
            className="rounded-md border border-edge px-2.5 py-1 text-ink-dim transition enabled:hover:border-edge-2 enabled:hover:text-ink disabled:opacity-40"
          >上一页</button>
          <span className="num px-1">{cur} / {pages}</span>
          <button
            disabled={cur >= pages}
            onClick={() => setPage(cur + 1)}
            className="rounded-md border border-edge px-2.5 py-1 text-ink-dim transition enabled:hover:border-edge-2 enabled:hover:text-ink disabled:opacity-40"
          >下一页</button>
        </div>
      </div>
    </section>
  )
}
