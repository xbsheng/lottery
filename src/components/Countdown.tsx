import { useEffect, useState } from 'react'
import { nextDraw, type Game } from '../lib/games'

function Cell({ v, unit }: { v: number; unit: string }) {
  return (
    <span className="flex flex-col items-center">
      <span className="num min-w-9 rounded-lg border border-edge bg-hall px-1.5 py-1 text-center text-lg font-bold leading-none text-ink sm:text-2xl">
        {String(v).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] text-ink-dim">{unit}</span>
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
      <Cell v={cd.hours} unit="时" />
      <span className="pb-4 text-ink-dim">:</span>
      <Cell v={cd.mins} unit="分" />
      <span className="pb-4 text-ink-dim">:</span>
      <Cell v={cd.secs} unit="秒" />
      <div className="ml-2 hidden text-xs text-ink-dim sm:block">{cd.label}</div>
    </div>
  )
}
