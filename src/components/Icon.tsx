const PATHS: Record<string, string> = {
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
}

export default function Icon({
  name, className = 'size-4', strokeWidth = 1.5,
}: {
  name: keyof typeof PATHS | string
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true"
    >
      <path d={PATHS[name] ?? PATHS.info} />
    </svg>
  )
}
