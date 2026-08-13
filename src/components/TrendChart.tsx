import { useMemo, useState } from 'react'
import type { Game, Row } from '../lib/games'

type GridData = {
  max: number
  recent: Row[]
  hit: Set<string>
  cells: { num: number; miss: number }[]
}

function buildGrid(rows: Row[], span: number, pick: (r: Row) => string[], max: number): GridData {
  const recent = rows.slice(-span)
  const hit = new Set<string>()
  recent.forEach((r, col) => pick(r).forEach((n) => hit.add(`${n}:${col}`)))
  const cells: GridData['cells'] = []
  for (let num = 1; num <= max; num++) {
    let miss = 0
    for (let col = recent.length - 1; col >= 0; col--) {
      if (hit.has(`${num}:${col}`)) break
      miss++
    }
    cells.push({ num, miss: miss >= recent.length ? recent.length : miss })
  }
  return { max, recent, hit, cells }
}

export default function TrendChart({ game, rows }: { game: Game; rows: Row[] }) {
  const [span, setSpan] = useState(30)

  const balls = useMemo(() => buildGrid(rows, span, (r) => r.balls, game.ballsMax), [game, rows, span])
  const special = useMemo(() => buildGrid(rows, span, (r) => r.special, game.specialMax), [game, rows, span])

  const cols = balls.recent.length

  const Grid = ({ d, blue }: { d: GridData; blue?: boolean }) => (
    <div className="overflow-x-auto">
      <div className="min-w-[24rem]">
        <div
          className="grid items-center gap-x-px gap-y-0.5"
          style={{ gridTemplateColumns: `2.6rem repeat(${cols}, minmax(1.05rem, 1fr)) 2.8rem` }}
        >
          <div className="text-center text-[9px] text-ink-dim">号</div>
          {d.recent.map((r) => (
            <div key={r.issue} className="text-center text-[9px] text-ink-dim">{r.issue.slice(-2)}</div>
          ))}
          <div className="text-center text-[9px] text-ink-dim">漏</div>
          {d.cells.map((c) => (
            <div key={c.num} className="contents">
              <div className="num pr-1 text-right text-[10px] text-ink-dim">{c.num}</div>
              {d.recent.map((_, col) => {
                const lit = d.hit.has(`${c.num}:${col}`)
                return (
                  <div key={col} className="flex justify-center">
                    <span
                      className="size-2.5 rounded-[3px] transition-transform hover:scale-125"
                      style={{
                        background: lit ? (blue ? '#3d7bff' : '#ff4d3d') : 'rgba(233,239,248,0.05)',
                        boxShadow: lit ? `0 0 6px ${blue ? '#3d7bff88' : '#ff4d3d88'}` : 'none',
                      }}
                    />
                  </div>
                )
              })}
              <div className="num pl-1 text-[10px]">
                <span className={c.miss >= cols ? 'text-gold' : c.miss >= 8 ? 'text-ink' : 'text-ink-dim'}>
                  {c.miss}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section className="panel p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold text-ink">遗漏走势</h3>
        <div className="flex items-center gap-1">
          {[20, 30, 50, 100].map((n) => (
            <button
              key={n}
              onClick={() => setSpan(n)}
              className={`num rounded-md px-2.5 py-1 text-xs transition ${span === n ? 'bg-edge-2 text-ink' : 'text-ink-dim hover:text-ink'}`}
            >{n}期</button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-ink-dim">红球区 · 点亮 = 该期开出，右侧数字 = 当前遗漏</p>
        <Grid d={balls} />
        <p className="pt-2 text-xs text-ink-dim">{game.key === 'ssq' ? '蓝球区' : '后区'} · 点亮 = 该期开出，右侧数字 = 当前遗漏</p>
        <Grid d={special} blue />
      </div>
    </section>
  )
}
