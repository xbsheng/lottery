import { useEffect, useMemo, useState } from 'react'
import type { Game } from '../lib/games'
import Ball from './Ball'
import Icon from './Icon'

function draw(game: Game) {
  const pick = (count: number, max: number) => {
    const pool = Array.from({ length: max }, (_, i) => i + 1)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, count).map(String).sort((a, b) => Number(a) - Number(b))
  }
  return { balls: pick(game.ballsCount, game.ballsMax), special: pick(game.specialCount, game.specialMax) }
}

export default function RandomPicker({ game }: { game: Game }) {
  const [tickets, setTickets] = useState<{ balls: string[]; special: string[] }[]>(() => [draw(game)])
  const [count, setCount] = useState(1)
  const [rolling, setRolling] = useState(false)

  // 切彩种时重置号码(规则不同: 33选6 vs 35选5)
  useEffect(() => { setTickets([draw(game)]) }, [game])

  const roll = () => {
    setRolling(true)
    // 滚动动画: 期间数字快速随机变化, 定格后落定
    const timer = setInterval(() => setTickets(Array.from({ length: count }, () => draw(game))), 70)
    setTimeout(() => { clearInterval(timer); setRolling(false) }, 650)
  }

  const note = useMemo(() => `${game.title} ${game.ballsCount}+${game.specialCount} 随机`, [game])

  return (
    <section className="panel p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold text-ink">随机选号</h3>
        <div className="flex items-center gap-2">
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded-lg border border-edge bg-hall px-2 py-1.5 text-sm text-ink focus:outline-none"
          >
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} 注</option>)}
          </select>
          <button
            onClick={roll}
            disabled={rolling}
            className="flex items-center gap-1.5 rounded-lg bg-gold px-3.5 py-1.5 text-sm font-bold text-[#1a1400] transition enabled:hover:brightness-110 enabled:active:scale-95 disabled:opacity-70"
          >
            <Icon name="dice" className="size-4" />
            {rolling ? '滚动中…' : '随机一注'}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {tickets.map((t, i) => (
          <div key={i} className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-edge bg-hall/60 px-3 py-2.5 sm:gap-2">
            <span className="num w-6 shrink-0 text-xs text-ink-dim">{i + 1}</span>
            {t.balls.map((n, j) => (
              <Ball key={j} n={n} color="red" size="md" responsive />
            ))}
            {t.special.map((n, j) => (
              <Ball key={`s${j}`} n={n} color="blue" size="md" responsive />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[11px] text-ink-dim">
        <Icon name="info" className="mt-0.5 size-3 shrink-0" />
        {note}，纯娱乐功能，开奖结果完全随机，不构成任何投注建议。
      </p>
    </section>
  )
}
