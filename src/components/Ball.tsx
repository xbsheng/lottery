export type BallColor = 'red' | 'blue' | 'gold'

const SIZE = {
  xs: 'size-5 text-[10px]',
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-12 text-lg',
  xl: 'size-16 text-2xl',
} as const

export default function Ball({
  n, color = 'red', size = 'md', lit = false, delay = 0,
}: {
  n: string | number
  color?: BallColor
  size?: keyof typeof SIZE
  lit?: boolean // 开奖仪式点亮动画
  delay?: number
}) {
  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold text-white ${SIZE[size]} ball-${color} ${lit ? 'ball-lit' : ''}`}
      style={lit ? { animationDelay: `${delay}s` } : undefined}
    >
      {String(n).padStart(2, '0')}
    </span>
  )
}
