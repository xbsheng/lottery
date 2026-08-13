export type BallColor = 'red' | 'blue' | 'gold'

const SIZE = {
  xs: 'size-5 text-[10px]',
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-12 text-lg',
  xl: 'size-16 text-2xl',
} as const

// 响应式: 移动端缩小一档, 保证 7 球一行
const RESP: Partial<Record<keyof typeof SIZE, string>> = {
  md: 'size-7 text-xs sm:size-9 sm:text-sm',
  lg: 'size-10 text-base sm:size-12 sm:text-lg',
  xl: 'size-9 text-sm sm:size-16 sm:text-2xl',
}

export default function Ball({
  n, color = 'red', size = 'md', lit = false, delay = 0, responsive = false,
}: {
  n: string | number
  color?: BallColor
  size?: keyof typeof SIZE
  lit?: boolean // 开奖仪式点亮动画
  delay?: number
  responsive?: boolean // 移动端缩小保证单行
}) {
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white ${responsive && RESP[size] ? RESP[size] : SIZE[size]} ball-${color} ${lit ? 'ball-lit' : ''}`}
      style={lit ? { animationDelay: `${delay}s` } : undefined}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
