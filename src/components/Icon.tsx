const PATHS: Record<string, string> = {
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  search: 'M21 21l-4.3-4.3M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z',
  calendar: 'M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  dice: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 8.2v7.6M8.5 10.5v.01M15.5 13.5v.01M15.5 10.5v.01M8.5 13.5v.01',
  trend: 'M3 17l6-6 4 4 8-9M21 6h-4M21 6v4',
  table: 'M4 5h16v14H4zM4 10h16M4 15h16M9 10v9M15 10v9',
  refresh: 'M21 12a9 9 0 11-2.6-6.4M21 3v6h-6',
  info: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  spark: 'M3 3v18h18M7 14l4-5 3 3 5-7',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
  chart: 'M4 20V11M9.5 20V5M15 20V14M20.5 20V8',
}

export default function Icon({
  name, className = 'size-4', strokeWidth = 1.5,
}: {
  name: keyof typeof PATHS | string
  className?: string
  strokeWidth?: number
}) {
  const filled = name === 'github' // 品牌图标用 fill, 其余统一 stroke 1.5px
  return (
    <svg
      viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
    >
      <path d={PATHS[name] ?? PATHS.info} />
    </svg>
  )
}
