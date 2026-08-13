import type { Game, Row } from '../lib/games'
import { weekdayOf } from '../lib/games'
import Ball from './Ball'
import Countdown from './Countdown'
import Icon from './Icon'

export default function LatestDraw({ game, latest, earliest }: { game: Game; latest?: Row; earliest?: Row }) {
  return (
    <section className="panel relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{
        background: `radial-gradient(55% 70% at 70% 20%, ${game.color}1f, transparent 70%)`,
      }} />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-ink-dim">
              <Icon name="calendar" className="size-3.5" />
              {latest ? `${latest.date} ${weekdayOf(latest.date)}` : '—'}
            </div>
            <h2 className="mt-1 text-xl font-bold text-ink sm:text-2xl">
              {latest ? (
                <>第 <span className="num text-gold">{latest.issue}</span> 期</>
              ) : '等待数据'}
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-edge bg-hall/60 px-4 py-2.5">
            <span className="hidden text-xs text-ink-dim sm:inline">距下次开奖</span>
            <Countdown game={game} />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-1 sm:gap-3" key={game.key}>
          {latest?.balls.map((n, i) => (
            <Ball key={`${game.key}-${i}`} n={n} color="red" size="xl" responsive lit delay={i * 0.14} />
          ))}
          {latest?.special.map((n, i) => (
            <Ball
              key={`${game.key}-s${i}`} n={n} color="blue" size="xl" responsive
              lit delay={(latest.balls.length + i) * 0.14}
            />
          ))}
        </div>

        <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink-dim">
          全量历史 <span className="num text-ink">{earliest ? `${earliest.issue.slice(0, 4)} 年至今` : '—'}</span> · 每期开奖即时统计 · 数据每日自动更新
        </p>
      </div>
    </section>
  )
}
