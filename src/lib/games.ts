export type Row = { issue: string; date: string; balls: string[]; special: string[] }

export type Game = {
  key: 'ssq' | 'dlt'
  title: string
  subtitle: string
  ballsCount: number
  ballsMax: number
  specialCount: number
  specialMax: number
  drawDays: number[] // 0 = 周日
  drawHour: number // 北京时间
  drawMin: number
  color: string
}

export const GAMES: Record<'ssq' | 'dlt', Game> = {
  ssq: {
    key: 'ssq', title: '双色球', subtitle: '33 选 6 · 16 选 1',
    ballsCount: 6, ballsMax: 33, specialCount: 1, specialMax: 16,
    drawDays: [2, 4, 0], drawHour: 21, drawMin: 15, color: '#ff4d3d',
  },
  dlt: {
    key: 'dlt', title: '大乐透', subtitle: '35 选 5 · 12 选 2',
    ballsCount: 5, ballsMax: 35, specialCount: 2, specialMax: 12,
    drawDays: [1, 3, 6], drawHour: 21, drawMin: 25, color: '#ff4d3d',
  },
}

const DAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/** 北京时间的年月日时分秒 */
function beijingParts(now: Date) {
  const p = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(now)
  const get = (t: string) => Number(p.find((x) => x.type === t)?.value ?? 0)
  return { y: get('year'), mo: get('month'), d: get('day'), h: get('hour'), mi: get('minute'), s: get('second') }
}

export type Countdown = { label: string; ms: number; hours: number; mins: number; secs: number }

/** 距下次开奖的北京时间时刻 */
export function nextDraw(game: Game, now = new Date()): Countdown {
  const b = beijingParts(now)
  const utc = Date.UTC(b.y, b.mo - 1, b.d, game.drawHour, game.drawMin, 0) - 8 * 3600_000
  const today = new Date(b.y, b.mo - 1, b.d) // 北京当天零点(本地时区无关紧要, 只取星期)
  let target = utc
  for (let i = 0; i < 8; i++) {
    const day = (today.getDay() + i) % 7
    if (game.drawDays.includes(day)) {
      const t = utc + i * 86400_000
      if (t > now.getTime()) { target = t; break }
    }
  }
  const ms = target - now.getTime()
  const total = Math.floor(ms / 1000)
  const label = `周${'日一二三四五六'[new Date(target).getDay()]} ${game.drawHour}:${String(game.drawMin).padStart(2, '0')} 开奖`
  return { label, ms, hours: Math.floor(total / 3600), mins: Math.floor((total % 3600) / 60), secs: total % 60 }
}

export function weekdayOf(dateStr: string) {
  const d = new Date(dateStr)
  return Number.isNaN(d.getTime()) ? '' : DAY_NAMES[d.getDay()]
}
