import { useEffect, useState } from 'react'
import { nextDraw, type Game } from '../lib/games'

function Cell({ v }: { v: number }) {
  return (
    <span className="num min-w-9 rounded-lg border border-edge bg-hall px-1.5 py-1 text-center text-lg font-bold leading-none text-ink sm:text-2xl">
      {String(v).padStart(2, '0')}
    </span>
  )
}

export default function Countdown({ game }: { game: Game }) {
  const [cd, setCd] = useState(() => nextDraw(game))
  useEffect(() => {
    const t = setInterval(() => setCd(nextDraw(game)), 1000)
    return () => clearInterval(t)
  }, [game])

  return (
    <div className="flex items-center gap-2">
      <Cell v={cd.hours} />
      <span className="pb-4 text-ink-dim">:</span>
      <Cell v={cd.mins} />
      <span className="pb-4 text-ink-dim">:</span>
      <Cell v={cd.secs} />
      <div className="ml-2 hidden text-xs text-ink-dim sm:block">{cd.label}</div>
    </div>
  )
}
