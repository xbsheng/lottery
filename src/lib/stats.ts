import type { Row } from './games'

/** 号码出现次数统计 */
export function frequency(rows: Row[], pick: (r: Row) => string[]) {
  const m = new Map<string, number>()
  for (const r of rows) for (const n of pick(r)) m.set(n, (m.get(n) ?? 0) + 1)
  return [...m.entries()].sort((a, b) => b[1] - a[1])
}

/** 号码遗漏: 当前(距上次出现)/最大/平均 */
export function missStats(rows: Row[], pick: (r: Row) => string[], max: number) {
  const last = new Map<number, number>() // 号码 -> 最后出现期序号(倒序)
  const count = new Map<number, number>() // 号码 -> 出现次数
  const gaps = new Map<number, number[]>()
  const n = rows.length
  for (let i = 0; i < n; i++) {
    for (const s of pick(rows[i])) {
      const num = Number(s)
      const idx = n - 1 - i // 最新一期为 0
      count.set(num, (count.get(num) ?? 0) + 1)
      if (last.has(num)) gaps.get(num)!.push(idx - last.get(num)!)
      else gaps.set(num, [])
      last.set(num, idx)
    }
  }
  const out: { num: number; current: number; max: number; avg: number; count: number }[] = []
  for (let num = 1; num <= max; num++) {
    const c = count.get(num) ?? 0
    const cur = c === 0 ? n : last.get(num)! // 从未出现视为全期遗漏
    const g = gaps.get(num) ?? []
    out.push({ num, current: cur, max: g.length ? Math.max(...g) : cur, avg: g.length ? g.reduce((a, b) => a + b, 0) / g.length : cur, count: c })
  }
  return out
}

/** 每期和值(balls 部分) */
export function sumSeries(rows: Row[], window: number) {
  return rows.slice(-window).map((r) => ({ issue: r.issue, sum: r.balls.reduce((a, b) => a + Number(b), 0) }))
}
